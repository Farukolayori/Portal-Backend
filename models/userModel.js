import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateStarted: { type: Date, required: true },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
