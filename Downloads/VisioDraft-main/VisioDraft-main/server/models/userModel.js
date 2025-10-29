import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name cannot be longer than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    isStudent: {
      type: Boolean,
      default: false,
    },
    university: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    registrationNumber: {
      type: String,
      trim: true,
    },
    year: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      sparse: true, // unique ke sath allow null
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [20, "Username cannot be longer than 20 characters"],
    },
    profilePicture: {
      type: String, // asset key or URL
      default: "",
      trim: true,
    },
    // Reset password fields
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

// Prevent model overwrite on hot reload
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
