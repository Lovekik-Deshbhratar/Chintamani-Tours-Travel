import express from "express";
import UserModel from "../model/User.js";
import { verifyUser, verifyAdmin } from "../middleware/verifyToken.js";
import nodemailer from "nodemailer";

const UserRoute = express.Router();

// Get All
UserRoute.get("/", verifyAdmin, async (req, res) => {
  try {
    const users = await UserModel.find();

    res.status(200).json({
      success: true,
      message: "Successfully",
      data: users,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
});

// Get One
UserRoute.get("/:id", verifyUser, async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await UserModel.findById(id);
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
UserRoute.put("/:id", verifyUser, async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await UserModel.findByIdAndUpdate(id, req.body, {
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
UserRoute.delete("/:id", verifyUser, async (req, res) => {
  const id = req.params.id;
  try {
    await UserModel.findByIdAndDelete(id);
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

// Forgot Password
UserRoute.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;
  const { otp } = req.body;

  try {
    const user = await UserModel.find({ email });

    // If user doesn't exist
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Dont have an account please register first",
      });
    }

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
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Failed to send OTP email",
        });
      }

      res.status(200).json({
        success: true,
        message: "OTP email sent successfully",
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default UserRoute;
