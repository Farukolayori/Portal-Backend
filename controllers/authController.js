import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

/**
 * REGISTER USER
 */
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, dateStarted } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dateStarted,
    });

    await newUser.save();

    // ✅ Return safe user info only
    res.status(201).json({
      message: "Registration successful!",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        dateStarted: newUser.dateStarted,
      },
    });
  } catch (err) {
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

    // ✅ Return safe user info only
    res.status(200).json({
      message: "Login successful!",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dateStarted: user.dateStarted,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
