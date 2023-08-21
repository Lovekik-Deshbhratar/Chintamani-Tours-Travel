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
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Tour Booking Confirmation</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  border: 1px solid #ddd;
                  border-radius: 10px;
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              }
              h1 {
                  font-size: 24px;
                  margin-bottom: 20px;
              }
              p {
                  font-size: 16px;
                  line-height: 1.5;
              }
              .highlight {
                  font-weight: bold;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Tour Booking Confirmation</h1>
              <p>Dear <span class="highlight">${userEmail}</span>,</p>
              
              <p>We are excited to confirm your booking for the <span class="highlight">${tourName}</span> on <span class="highlight">${bookAt}</span>. Your booking details are as follows:</p>
              
              <p>
                  <strong>Tour Name:</strong> ${tourName}<br>
                  <strong>Booking Date:</strong> ${bookAt}<br>
                  <strong>Number of People:</strong> ${peopleSize}<br>
                  <strong>Tour Price X Number of people:</strong> ${amountXprice}<br>
                  <strong>Service Charges:</strong> ${serviceCharges}<br>
                  <strong>Grand Total:</strong> ${total}
              </p>
              
              <p>Your booking is now confirmed, and we look forward to having you on the tour. If you have any questions or need further assistance, please feel free to contact our support team.</p>
              
              <p>Thank you for choosing us for your travel experience!</p>
              
              <p>Best regards,</p>
          </div>
      </body>
      </html>
      `,
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
