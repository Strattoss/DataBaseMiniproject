const Trip = require("../models/trip");
const Customer = require("../models/customer")


const reservationController = {
  getCustomerReservations: async (req, res) => {
    try {
      //tablica reservations customera z populate-owanym tripId
      const { reservations } = await Customer.findById(req.params.id).select('reservations').populate('reservations.tripId', 'title destination startDate endDate reservations').lean()
      //to co będzie zwracane - mapuje każdą parę reservationId, tripId (zpopulowane)
      const result = reservations.map(r => {
        const {reservationId, tripId} = r
        //zwraca tylko poszukiwane rezerwacje
        const filtered = tripId.reservations.find(r => r._id.equals(reservationId) && r.state == 'New')
        if(filtered !== undefined) {
          const { review, ...rest } = filtered
          return {
            title: tripId.title,
            destination: tripId.destination,
            startDate: tripId.startDate,
            endDate: tripId.endDate,
            tripId: tripId._id,
            ...rest
          }
        }

        return filtered
      }).filter(r => r != null)
      if (!result) {
        res.status(404).json({ message: "Reservation not found" });
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCustomerCancelledReservations: async (req, res) => {
    try {
      const { reservations } = await Customer.findById(req.params.id).select('reservations').populate('reservations.tripId', 'title destination startDate endDate reservations').lean()
      const result = reservations.map(r => {
        const {reservationId, tripId} = r
        const filtered = tripId.reservations.find(r => r._id.equals(reservationId) && r.state == 'Cancelled')
        if(filtered !== undefined) {
          const { review, ...rest } = filtered
          return {
            title: tripId.title,
            destination: tripId.destination,
            startDate: tripId.startDate,
            endDate: tripId.endDate,
            tripId: tripId._id,
            ...rest
          }
        }

        return filtered
      }).filter(r => r != null)
      if (!result) {
        res.status(404).json({ message: "Reservation not found" });
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createReservation: async (req, res) => {
    let newReservation = null
    try {
      const trip = await Trip.findById(req.body.tripId).select('seats reservations')
      
      newReservation = trip.reservations.create({
        reservationDate: new Date(),
        price: req.body.price,
        tickets: req.body.tickets,
        state: 'New',
        customerId: req.body.customerId
      })
      trip.reservations.push(newReservation)
      
      await trip.save();
      
      const customer = await Customer.findById(req.body.customerId).select('reservations')
      customer.reservations.push({
        tripId: req.body.tripId,
        reservationId: newReservation._id
      })
      await customer.save();

      res.status(201).json(newReservation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createReview: async (req, res) => {
    try {
      const tripToReview = await Trip.findById(req.body.tripId).select('reservations')
      const canBeReviewed = tripToReview.reservations.filter(r => r._id == req.body.reservationId && r.state == 'New' && tripToReview.endDate < new Date()).length > 0
    
      if(!canBeReviewed) {
        res.status(500).json({ message: `Cannot add review for this trip` })
        return
      }

      const updatedReservation = await Trip.findOneAndUpdate(
        { "_id": req.body.tripId, "reservations._id": req.body.reservationId },
        { "$set": {
          "reservations.$.review": {
            comment: req.body.comment,
            rating: req.body.rating,
            reviewDate: new Date()
          }
        }}
      );
      if (!updatedReservation) {
        res.status(404).json({ message: "Reservation not found" });
      } else {
        res.status(200).json(updatedReservation);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  resignReservation: async (req, res) => {
    try {
      const reservationToResign = await Trip.findById(req.body.tripId).select('reservations')
      const canBeResigned = reservationToResign.reservations.filter(r => r._id == req.body.reservationId && r.state == 'New').length > 0
    
      if(!canBeResigned) {
        res.status(500).json({ message: `Cannot resign from reservation with id ${req.body.reservationId}` })
        return
      }
      
      const updatedReservation = await Trip.findOneAndUpdate(
        { "_id": req.body.tripId, "reservations._id": req.body.reservationId },
        { "$set": {
          "reservations.$.state": 'Cancelled',
          "reservations.$.cancelationDate": new Date()
        } }
      );
      if (!updatedReservation) {
        res.status(404).json({ message: "Reservation not found" });
      } else {
        res.status(200).json(updatedReservation);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = reservationController;