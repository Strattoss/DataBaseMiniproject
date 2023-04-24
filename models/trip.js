const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    alt: {
      type: String,
      required: true,
    },
    srcFull: {
      type: String,
      required: true,
    },
    srcThumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  });

const tripSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "availableSeats must be an integer.",
    },
    min: 0,
  },
  title: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  images: [imageSchema],
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;