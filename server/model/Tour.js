import mongoose, { Schema } from "mongoose";

const tourSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    photo: { type: String, requird: true },
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
