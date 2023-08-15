import mongoose, { Schema } from "mongoose";

const tourSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String },
    photo: { type: String, required: true },
    quote: { type: String, required: true },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

const TourModel = mongoose.model("Tour", tourSchema);
export default TourModel;
