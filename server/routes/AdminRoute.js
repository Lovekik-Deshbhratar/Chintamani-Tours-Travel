import express from "express";
import bcrypt from "bcryptjs";
import AdminModel from "../model/Admin.js";
import { verifyAdmin } from "../middleware/verifyToken.js";

const AdminRoute = express.Router();

// Create Admin
AdminRoute.post("/", verifyAdmin, async (req, res) => {
  try {
    // Hashing passsword
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const doc = new AdminModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await doc.save();
    res.status(200).json({ success: true, message: "Successfully created" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create, Try again" });
  }
});

// Get One
AdminRoute.get("/:id", verifyAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await AdminModel.findById(id).populate("reviews");
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

// Get All
AdminRoute.get("/", verifyAdmin, async (req, res) => {
  try {
    const users = await AdminModel.find();

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

// Update One
AdminRoute.put("/:id", verifyAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await AdminModel.findByIdAndUpdate(id, req.body, {
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
AdminRoute.delete("/:id", verifyAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    await AdminModel.findByIdAndDelete(id);
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
export default AdminRoute;
