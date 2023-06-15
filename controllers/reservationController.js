const Trip = require("../models/trip");
const Customer = require("../models/customer")
const Reservation = require("../models/reservation")

const reservationController = {
  getAllReservations: async (req, res) => { //TODO
    try {
      const reservations = await Reservation.find();
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCustomerReservation: async (req, res) => {
    const start = Date.now()
    console.log(start)
    try {
      //tablica reservations customera z populate-owanym tripId
      const { reservations } = await Customer.findById(req.params.id).select('reservations').populate('reservations.tripId', 'title destination startDate endDate reservations').lean()
      //to co będzie zwracane - mapuje każdą parę reservationId, tripId (zpopulowane)
      const result = reservations.map(r => {
        let {reservationId, tripId} = r
        //zwraca tylko poszukiwane rezerwacje
        const filtered = tripId.reservations.filter(r => r._id.equals(reservationId))
        
        return filtered
      })
      if (!result) {
        res.status(404).json({ message: "Reservation not found" });
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    const end = Date.now()
    console.log(end)
    console.log(end - start);
  },

  createReservation: async (req, res) => {
    try {
      const reservation = new Reservation(req.body);
      await reservation.save();
      res.status(201).json(reservation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateReservation: async (req, res) => {
    try {
      const updatedReservation = await Reservation.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
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

  deleteReservation: async (req, res) => {
    try {
      const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
      if (!deletedReservation) {
        res.status(404).json({ message: "Reservation not found" });
      } else {
        res.status(200).json({ message: "Reservation deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = reservationController;