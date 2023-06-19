const Trip = require("../models/trip");

const tripController = {
  getAllTrips: async (req, res) => {
    try {
      const trips = await Trip.find().select('seats reservations title destination startDate endDate unitPrice').lean();
      const result = trips.map(trip => {
        const {seats, reservations, ...rest} = trip
        let availableSeats = seats
        let ratingSum = 0.0
        let rates = 0
        if(reservations !== undefined)
        {
          for(const reservation of reservations) {
            if(reservation.state != "Cancelled")
              availableSeats -= reservation.tickets
            if(reservation.review) {
              ratingSum += reservation.review.rating
              rates++
            }
          }
        }
        return {
          availableSeats: availableSeats,
          avgRating: rates == 0 ? null : Math.round(ratingSum / rates),
          ...rest
        }
      })
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

 
  getTripById: async (req, res) => { 
    try {
      const {seats, reservations, ...rest} = await Trip.findById(req.params.id).populate('reservations.customerId', 'username').lean();
      let availableSeats = seats
      let ratingSum = 0.0
        let rates = 0
      if(reservations !== undefined)
      {
        for(const reservation of reservations) {
          if(reservation.state != "Cancelled")
            availableSeats -= reservation.tickets
          if(reservation.review) {
            ratingSum += reservation.review.rating
            rates++
          }
        }
      }
      const trip = {
        availableSeats: availableSeats,
        avgRating: rates == 0 ? null : Math.round(ratingSum / rates),
        reviews: reservations === undefined ? null : reservations.filter(x => x.review).map(x => {
          return {
            author: x.customerId.username,
            ...x.review
          }}),
        ...rest
      }
      if (!trip) {
        res.status(404).json({ message: "Trip not found" });
      } else {
        res.status(200).json(trip);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // ^Wersja o dziwo lekko szybsza (około 20% szybsza, tu i tu prędkość rzędu 20ms), zamiast populata własnoręcznie znajdywanie customerId
  // const {seats, reservations, ...rest} = await Trip.findById(req.params.id).lean();
  // let availableSeats = seats
  // if(reservations !== undefined)
  // {
  //   for(const reservation of reservations) {
  //     if(reservation.state != "Cancelled")
  //       availableSeats -= reservation.tickets
  //     if(reservation.review)
  //       reservation.review.author = await Customer.findById(reservation.customerId).select('username')
  //   }
  // }
  // const trip = {
  //   availableSeats: availableSeats,
  //   reviews: reservations === undefined ? null : reservations.filter(x => x.review).map(x => x.review),
  //   ...rest
  // }

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