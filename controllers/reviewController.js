const Review = require("../models/review");

const reviewController = {
  getAllReviews: async (req, res) => {
    try {
      const reviews = await Review.find();
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getReviewById: async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) {
        res.status(404).json({ message: "Review not found" });
      } else {
        res.status(200).json(review);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createReview: async (req, res) => {
    try {
      const review = new Review(req.body);
      await review.save();
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateReview: async (req, res) => {
    try {
      const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedReview) {
        res.status(404).json({ message: "Review not found" });
      } else {
        res.status(200).json(updatedReview);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteReview: async (req, res) => {
    try {
      const deletedReview = await Review.findByIdAndDelete(req.params.id);
      if (!deletedReview) {
        res.status(404).json({ message: "Review not found" });
      } else {
        res.status(200).json({ message: "Review deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = reviewController;
