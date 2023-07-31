import express from "express";
import TourModel from "../model/Tour.js";

const TourRoute = express.Router();

TourRoute.post("/", async (req, res) => {
  const tour = new TourModel(req.body);
  try {
    const savedTour = await tour.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedTour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create, try again",
    });
  }
});

TourRoute.get("/", async (req, res) => {
  try {
    const tours = await TourModel.find();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedTour,
    });
  } catch (error) {}
});

export default TourRoute;
