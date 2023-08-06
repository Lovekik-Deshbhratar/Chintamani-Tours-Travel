import express from "express";
import BookingModel from "../model/Booking.js";
import { verifyAdmin, verifyUser } from "../middleware/verifyToken.js";

const BookingRoute = express.Router();

// Create new Booking
BookingRoute.post("/", verifyUser, async (req, res) => {
  const newBooking = new BookingModel(req.body);
  try {
    const doc = await newBooking.save();
    res
      .status(200)
      .json({ success: true, message: "Your tour is booked", data: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Get all booking
BookingRoute.get("/", verifyAdmin, async (req, res) => {
  try {
    const doc = await BookingModel.find();
    res.status(200).json({ success: true, message: "Successful", data: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Get one booking
BookingRoute.get("/:id", verifyUser, async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await BookingModel.findById(id);
    res.status(200).json({ success: true, message: "Successful", data: doc });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found" });
  }
});

export default BookingRoute;
