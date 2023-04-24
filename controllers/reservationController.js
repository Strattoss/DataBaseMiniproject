const Reservation = require("../models/reservation");

const reservationController = {
  getAllReservations: async (req, res) => {
    try {
      const reservations = await Reservation.find();
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getReservationById: async (req, res) => {
    try {
      const reservation = await Reservation.findById(req.params.id);
      if (!reservation) {
        res.status(404).json({ message: "Reservation not found" });
      } else {
        res.status(200).json(reservation);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
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