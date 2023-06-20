const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  reservationDate: {
    type: Date,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: false,
  },
  tickets: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "tickets must be an integer.",
    },
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 1
  },
  state: {
    type: String,
    enum: ["New", "Purchased", "Cancelled"],
    required: true,
  },
  customerId: {
    type: mongoose.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  review: {
    type: {
      comment: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        validate: {
          validator: Number.isInteger,
          message: "rating must be an integer.",
        },
        min: 1,
        max: 5
      },
      reviewDate: {
        type: Date,
        required: true,
      },
    },
    required: false,
  }
});

module.exports = reservationSchema;