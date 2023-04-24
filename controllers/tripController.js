const Trip = require("../models/trip");

const tripController = {
  getAllTrips: async (req, res) => {
    try {
      const trips = await Trip.find();
      res.status(200).json(trips);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

 
  getTripById: async (req, res) => {
    try {
      const trip = await Trip.findById(req.params.id);
      if (!trip) {
        res.status(404).json({ message: "Trip not found" });
      } else {
        res.status(200).json(trip);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },


  createTrip: async (req, res) => {
    try {
      const trip = new Trip(req.body);
      await trip.save();
      res.status(201).json(trip);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateTrip: async (req, res) => {
    try {
      const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedTrip) {
        res.status(404).json({ message: "Trip not found" });
      } else {
        res.status(200).json(updatedTrip);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteTrip: async (req, res) => {
    try {
      const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
      if (!deletedTrip) {
        res.status(404).json({ message: "Trip not found" });
      } else {
        res.status(200).json({ message: "Trip deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = tripController