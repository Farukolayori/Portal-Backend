import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("✅ MongoDB connected");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "mark@gmail.com" });
    
    if (existingAdmin) {
      console.log("⚠️ Admin user already exists");
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("Olayori25", 10);
    
    const admin = new User({
      firstName: "Ariyo",
      lastName: "Oluwapelumi",
      email: existingAdmin,
      password: hashedPassword,
      dateStarted: new Date(),
      role: "admin",
      profileImage: null
    });

    await admin.save();
    
    console.log("✅ Admin user created successfully!");
    console.log("📧 Email: admin@ibadanpoly.edu.ng");
    console.log("🔑 Password: Admin@2025");
    console.log("⚠️ Please change the password after first login!");
    
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

seedAdmin();