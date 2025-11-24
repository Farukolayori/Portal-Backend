import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

/**
 * REGISTER USER
 */
// In your authController.js
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, dateStarted, profileImage } = req.body;

    console.log("Received dateStarted:", dateStarted); // ✅ Debug

    if (!dateStarted) {
      return res.status(400).json({ message: "Date started is required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dateStarted: new Date(dateStarted), // ✅ Convert to Date object
      role: 'user',
      profileImage: profileImage || null,
    });

    await newUser.save();

    res.status(201).json({
      message: "Registration successful!",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        dateStarted: newUser.dateStarted,
        role: newUser.role,
        profileImage: newUser.profileImage,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * LOGIN USER
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // ✅ IMPORTANT: Make sure role and profileImage are included
    res.status(200).json({
      message: "Login successful!",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dateStarted: user.dateStarted,
        role: user.role, // ✅ Must include this
        profileImage: user.profileImage, // ✅ Must include this
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};