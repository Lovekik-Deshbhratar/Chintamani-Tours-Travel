import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import TourRoute from "./routes/TourRoute.js";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import ReviewRoute from "./routes/ReviewRoute.js";

// Server Creation
const server = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
  credentials: true,
};

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
server.use(cors(corsOptions));
server.use(express.json({ limit: "50mb" }));
server.use("/api/v1/auth", AuthRoute);
server.use("/api/v1/tours", TourRoute);
server.use("/api/v1/users", UserRoute);
server.use("/api/v1/review", ReviewRoute);

// Server connection to port
server.listen(port, () => {
  connect();
  console.log("Server Started at", port);
});
