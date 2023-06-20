const Customer = require("../models/customer")
const Trip = require("../models/trip")

const purchaseController = {
  getCustomerPurchases: async (req, res) => {
    try {
      const { reservations } = await Customer.findById(req.params.id).select('reservations').populate('reservations.tripId', 'title destination startDate endDate reservations').lean()
      const result = reservations.map(r => {
        const {reservationId, tripId} = r
        const filtered = tripId.reservations.find(r => r._id.equals(reservationId) && r.state == 'Purchased')
        if(filtered !== undefined) {
          const { review, ...rest } = filtered
          return {
            title: tripId.title,
            destination: tripId.destination,
            startDate: tripId.startDate,
            endDate: tripId.endDate,
            tripId: tripId._id,
            review: review === undefined ? false : true,
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
  buyReservation: async (req, res) => {
    try {
      const reservationToResign = await Trip.findById(req.body.tripId).select('reservations')
      const canBeResigned = reservationToResign.reservations.filter(r => r._id == req.body.reservationId && r.state == 'New').length > 0
      
      const updatedReservation = await Trip.findOneAndUpdate(
        { "_id": req.body.tripId, "reservations._id": req.body.reservationId },
        { "$set": {
          "reservations.$.state": 'Purchased',
          "reservations.$.purchaseDate": new Date()
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

module.exports = purchaseController;
