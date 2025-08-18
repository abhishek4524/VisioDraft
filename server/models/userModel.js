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
      required: function () {
        return this.isStudent;
      },
    },
    // New fields for profile setup
    username: {
      type: String,
      unique: true,
      sparse: true, // Allows many nulls before setup
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [20, "Username cannot be longer than 20 characters"],
    },
    avatar: {
      type: String, // store URL or image path
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
    minimize: false, // keep empty objects instead of removing them
  }
);

// Prevent model overwrite on hot-reload in dev
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
