import express from "express";
import bcrypt from "bcryptjs";
import AdminModel from "../model/Admin.js";

const AdminRoute = express.Router();

AdminRoute.post("/", async (req, res) => {
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

AdminRoute.get("/", async (req, res) => {
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
  ``;
});

export default AdminRoute;
