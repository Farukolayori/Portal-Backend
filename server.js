import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"; // ✅ ADD THIS

dotenv.config();

const app = express();

// ------------------ MIDDLEWARE ------------------
app.use(cors()); 
app.use(express.json({ limit: '10mb' })); // ✅ Increase limit for base64 images
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ------------------ ROUTES ------------------
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // ✅ ADD THIS LINE

// ------------------ MONGODB CONNECTION ------------------
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    process.exit(1);
  }
};

connectDB();

// ------------------ SERVER ------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("🔐 Available routes:");
  console.log("   - POST /api/auth/register");
  console.log("   - POST /api/auth/login");
  console.log("   - GET  /api/users");
  console.log("   - GET  /api/users/:id");
  console.log("   - PUT  /api/users/:id");
  console.log("   - DELETE /api/users/:id");
});

app.get("/", (req, res) => {
  res.send("Backend is working! Access API at /api/auth or /api/users");
});