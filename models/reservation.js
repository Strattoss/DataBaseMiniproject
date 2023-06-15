const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  reservationDate: {
    type: Date,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
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
    required: true
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
    type: [{
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
      },
      reviewDate: {
        type: Date,
        required: true,
      },
    }],
    required: true,
  }
});

module.exports = reservationSchema;