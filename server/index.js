import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import TourRoute from "./routes/TourRoute.js";

// Server Creation
const server = express();
const port = process.env.PORT || 8000;

// Mongoose to database connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.LOCAL_MONGO_URL);
    console.log("Database Connected");
  } catch (error) {
    console.log("Database Connection Failure");
  }
};

// Middleware
server.use(cors());
server.use(express.json({ limit: "50mb" }));
server.use("/api/tour/create", TourRoute);

// Server connection to port
server.listen(port, () => {
  connect();
  console.log("Server Started at", port);
});
