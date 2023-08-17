import express from "express";
import BookingModel from "../model/Booking.js";
import { verifyAdmin, verifyUser } from "../middleware/verifyToken.js";
import nodemailer from "nodemailer";

const BookingRoute = express.Router();

// Create new Booking
BookingRoute.post("/", verifyUser, async (req, res) => {
  const newBooking = new BookingModel(req.body);
  const {
    tourName,
    bookAt,
    peopleSize,
    userEmail,
    amountXprice,
    serviceCharges,
    total,
  } = req.body;
  try {
    const doc = await newBooking.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Tour Booking Confirmation`,
      text: `Dear ${userEmail},

      We are excited to confirm your booking for the ${tourName} on ${bookAt}. Your booking details are as follows:
      
      Tour Name: ${tourName}
      Booking Date: ${bookAt}
      Number of People: ${peopleSize}
      Tour Price X Number of people: ${amountXprice}
      Service Charges: ${serviceCharges}
      Grand Total: ${total}
      
      Your booking is now confirmed, and we look forward to having you on the tour. If you have any questions or need further assistance, please feel free to contact our support team.
      
      Thank you for choosing us for your travel experience!
      
      Best regards`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }

      res.status(200).json({ success: true, message: "Your tour is booked" });
    });
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
