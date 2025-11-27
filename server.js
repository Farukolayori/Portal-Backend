import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // For base64 images

// Routes
app.use("/api/auth", authRoutes);  // ✅ This is critical!
app.use("/api/users", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Available routes log
console.log("Available routes:");
console.log("   - POST /api/auth/register");
console.log("   - POST /api/auth/login");
console.log("   - GET  /api/users");
console.log("   - GET  /api/users/:id");

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));