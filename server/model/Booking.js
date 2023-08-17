import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    userId: {
      type: String,
    },
    userEmail: { type: String },
    tourName: { type: String, required: true },
    fullName: { type: String, required: true },
    peopleSize: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    bookAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, strict: true }
);

const BookingModel = mongoose.model("Booking", bookingSchema);
export default BookingModel;
