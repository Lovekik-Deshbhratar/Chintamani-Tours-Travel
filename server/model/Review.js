import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Tour",
    },
    username: { type: String, required: true },
    reviewText: { type: String, required: true },
  },
  { timestamps: true }
);

const ReviewModel = mongoose.model("Review", reviewSchema);
export default ReviewModel;
