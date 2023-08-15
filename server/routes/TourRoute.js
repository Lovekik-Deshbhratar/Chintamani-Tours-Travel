import express from "express";
import TourModel from "../model/Tour.js";
import { verifyAdmin } from "../middleware/verifyToken.js";

const TourRoute = express.Router();

// Create Tour
TourRoute.post("/", verifyAdmin, async (req, res) => {
  const tour = new TourModel(req.body);
  try {
    const doc = await tour.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: doc,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create, try again",
    });
  }
});

// Get All
TourRoute.get("/", async (req, res) => {
  // Pagination
  const page = parseInt(req.query.page);
  const sort = req.query.sort;
  try {
    const tours = await TourModel.find()
      .populate("reviews")
      .sort({ createdAt: sort })
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successfully",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
});

// Get One
TourRoute.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await TourModel.findById(id).populate("reviews");
    res.status(200).json({
      success: true,
      message: "Successfully",
      data: doc,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
});

// Update One
TourRoute.put("/:id", verifyAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await TourModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: doc,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
    });
  }
});

// Delete One
TourRoute.delete("/:id", verifyAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    await TourModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
});

// Get tour by search
TourRoute.get("/search/getByTour", async (req, res) => {
  const location = new RegExp(req.query.location, "i");
  const date = new Date(req.query.date);

  try {
    const doc = await TourModel.find({
      location,
      date: { $gte: date },
    }).populate("reviews");
    res.status(200).json({
      success: true,
      message: "Successfully",
      data: doc,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
});

// Get latest 8 tour
TourRoute.get("/latest/tour", async (req, res) => {
  try {
    const tours = await TourModel.find()
      .populate("reviews")
      .sort({ createdAt: -1 })
      .limit(8);
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successfully",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
});

// Get tour count
TourRoute.get("/search/getTourCount", async (req, res) => {
  try {
    const docCount = await TourModel.estimatedDocumentCount();
    res.status(200).json({
      success: true,
      data: docCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch",
    });
  }
});

export default TourRoute;
