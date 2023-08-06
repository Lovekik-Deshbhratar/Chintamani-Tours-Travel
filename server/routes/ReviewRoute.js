import express from "express";
import ReviewModel from "../model/Review.js";
import TourModel from "../model/Tour.js";
import { verifyUser } from "../middleware/verifyToken.js";

const ReviewRoute = express.Router();

// Create Review
ReviewRoute.post("/:tourId", verifyUser, async (req, res) => {
  const tourId = req.params.tourId;
  const newReview = new ReviewModel({ ...req.body });

  try {
    const doc = await newReview.save();

    // After creating a new review now update the review array of tour model
    await TourModel.findByIdAndUpdate(tourId, { $push: { reviews: doc._id } });

    res
      .status(200)
      .json({ success: true, message: "Review submitted", data: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to submit" });
  }
});

export default ReviewRoute;
