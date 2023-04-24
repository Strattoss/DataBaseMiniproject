const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
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
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;