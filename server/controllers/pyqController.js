import Pyq from "../models/pyqModel.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

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
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // GridFS upload
    const db = mongoose.connection.db;
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "pyqs" });
    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype
    });
    fs.createReadStream(req.file.path).pipe(uploadStream)
      .on("error", (err) => {
        try { fs.unlinkSync(req.file.path); } catch (e) {}
        return next(err);
      })
      .on("finish", async (file) => {
        try { fs.unlinkSync(req.file.path); } catch (e) {}
        const newPyq = new Pyq({
          title,
          description,
          course,
          semester,
          branch,
          year,
          subject,
          file: file._id.toString(), // GridFS file id
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

    pyq.downloadCount += 1;
    await pyq.save();

    // Download from GridFS
    const db = mongoose.connection.db;
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "pyqs" });
    const fileId = new mongoose.Types.ObjectId(pyq.file);
    bucket.find({ _id: fileId }).toArray((err, files) => {
      if (err || !files || files.length === 0) {
        return res.status(404).json({ success: false, message: "File not found" });
      }
      res.set({
        'Content-Type': files[0].contentType,
        'Content-Disposition': `attachment; filename="${files[0].filename}"`
      });
      bucket.openDownloadStream(fileId).pipe(res);
    });
  } catch (error) {
    next(error);
  }
};
