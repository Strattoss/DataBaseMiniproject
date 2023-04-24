const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  purchaseDate: {
    type: Date,
    required: true,
  },
  boughtTickets: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "boughtTickets must be an integer.",
    },
    min: 1,
  },
  state: {
    type: String,
    enum: ["New", "Purchased", "Cancelled"],
    required: true,
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;