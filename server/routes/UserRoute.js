import express from "express";
import UserModel from "../model/User.js";
import { verifyUser, verifyAdmin } from "../middleware/verifyToken.js";

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

export default UserRoute;
