import Pyq from "../models/pyqModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Upload PYQ (Admin only)
export const uploadPyq = async (req, res, next) => {
  try {
    const {
      title,
      description,
      course,
      semester,
      branch,
      subject,
      year,
      uploadedBy,
    } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "pyqs",
      resource_type: "auto",
    });

    // Optionally delete local file after upload
    try { fs.unlinkSync(req.file.path); } catch (e) {}

    const newPyq = new Pyq({
      title,
      description,
      course,
      semester,
      branch,
      year,
      subject,
      file: result.secure_url, // Cloudinary URL
      uploadedBy,
    });

    await newPyq.save();

    res.status(201).json({
      success: true,
      message: "PYQ uploaded successfully",
      data: {
        id: newPyq._id,
        title: newPyq.title,
        file: newPyq.file,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all PYQs (Public)
export const getAllPyqs = async (req, res, next) => {
  try {
    const pyqs = await Pyq.find()
      .select("-__v")
      .populate("uploadedBy", "email");
    res.json({ success: true, data: pyqs });
  } catch (error) {
    next(error);
  }
};

// Get single PYQ (Public)
export const getPyqById = async (req, res, next) => {
  try {
    const pyq = await Pyq.findById(req.params.id).select("-__v");
    if (!pyq) {
      return res.status(404).json({ success: false, message: "PYQ not found" });
    }
    res.json({ success: true, data: pyq });
  } catch (error) {
    next(error);
  }
};

// ✅ Download PYQ (Public)
export const downloadPyq = async (req, res, next) => {
  try {
    const pyq = await Pyq.findById(req.params.id);
    if (!pyq) {
      return res.status(404).json({ success: false, message: "PYQ not found" });
    }

    // ✅ Increase download count
    pyq.downloadCount += 1;
    await pyq.save();

    // Send Cloudinary URL for download
    res.json({ success: true, url: pyq.file });
  } catch (error) {
    next(error);
  }
};
