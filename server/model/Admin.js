import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

const AdminModel = mongoose.model("Admin", adminSchema);
export default AdminModel;
