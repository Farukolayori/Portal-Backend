import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: function(v) {
        return v.toLowerCase().endsWith('@gmail.com');
      },
      message: 'Email must be a Gmail address (@gmail.com)'
    }
  },
  password: { 
    type: String, 
    required: true 
  },
  dateStarted: { 
    type: Date, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ["user", "admin"], 
    default: "user" 
  },
  profileImage: { 
    type: String, 
    required: true  // ✅ Now required!
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);