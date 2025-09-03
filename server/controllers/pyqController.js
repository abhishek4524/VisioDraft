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

    // Validate required fields
    if (!title || !course || !semester || !branch || !subject || !year) {
      try { fs.unlinkSync(req.file.path); } catch (e) {}
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields: title, course, semester, branch, subject, year" 
      });
    }

    // GridFS upload
    const db = mongoose.connection.db;
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "pyqs" });
    
    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype
    });

    const readStream = fs.createReadStream(req.file.path);
    
    readStream.pipe(uploadStream)
      .on("error", (err) => {
        try { fs.unlinkSync(req.file.path); } catch (e) {}
        return next(err);
      })
      .on("finish", async (file) => {
        try { 
          fs.unlinkSync(req.file.path); 
        } catch (e) {
          console.error("Error deleting temp file:", e);
        }
        
        try {
          const newPyq = new Pyq({
            title,
            description: description || "",
            course,
            semester,
            branch,
            year,
            subject,
            file: file._id.toString(),
            uploadedBy: uploadedBy || "admin",
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
        } catch (saveError) {
          // If saving fails, delete the uploaded file from GridFS
          bucket.delete(file._id, (deleteErr) => {
            if (deleteErr) {
              console.error("Error deleting file from GridFS:", deleteErr);
            }
          });
          next(saveError);
        }
      });

  } catch (error) {
    if (req.file) {
      try { fs.unlinkSync(req.file.path); } catch (e) {}
    }
    next(error);
  }
};

// Get all PYQs (Public) with optional filtering
export const getAllPyqs = async (req, res, next) => {
  try {
    const { course, semester, branch, subject, year } = req.query;
    const filter = {};
    
    if (course) filter.course = course;
    if (semester) filter.semester = semester;
    if (branch) filter.branch = branch;
    if (subject) filter.subject = subject;
    if (year) filter.year = year;

    const pyqs = await Pyq.find(filter)
      .select("-__v")
      .populate("uploadedBy", "email name")
      .sort({ createdAt: -1 });
      
    res.json({ 
      success: true, 
      count: pyqs.length,
      data: pyqs 
    });
  } catch (error) {
    next(error);
  }
};

// Get single PYQ (Public)
export const getPyqById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid PYQ ID" });
    }

    const pyq = await Pyq.findById(id)
      .select("-__v")
      .populate("uploadedBy", "email name");
      
    if (!pyq) {
      return res.status(404).json({ success: false, message: "PYQ not found" });
    }
    
    res.json({ success: true, data: pyq });
  } catch (error) {
    next(error);
  }
};

// Download PYQ (Public)
export const downloadPyq = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid PYQ ID" });
    }

    const pyq = await Pyq.findById(id);
    if (!pyq) {
      return res.status(404).json({ success: false, message: "PYQ not found" });
    }

    // Increment download count
    pyq.downloadCount += 1;
    await pyq.save();

    // Download from GridFS
    const db = mongoose.connection.db;
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "pyqs" });
    
    let fileId;
    try {
      fileId = new mongoose.Types.ObjectId(pyq.file);
    } catch (error) {
      return res.status(400).json({ success: false, message: "Invalid file ID format" });
    }

    // Check if file exists
    const files = await bucket.find({ _id: fileId }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ success: false, message: "File not found in storage" });
    }

    const file = files[0];
    
    res.set({
      'Content-Type': file.contentType || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${file.filename}"`,
      'Content-Length': file.length
    });

    const downloadStream = bucket.openDownloadStream(fileId);
    
    downloadStream.on('error', (error) => {
      console.error('Download stream error:', error);
      if (!res.headersSent) {
        res.status(500).json({ success: false, message: "Error downloading file" });
      }
    });

    downloadStream.pipe(res);
    
  } catch (error) {
    next(error);
  }
};

// Delete PYQ (Admin only)
export const deletePyq = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid PYQ ID" });
    }

    const pyq = await Pyq.findById(id);
    if (!pyq) {
      return res.status(404).json({ success: false, message: "PYQ not found" });
    }

    // Delete file from GridFS
    const db = mongoose.connection.db;
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "pyqs" });
    
    try {
      const fileId = new mongoose.Types.ObjectId(pyq.file);
      await bucket.delete(fileId);
    } catch (error) {
      console.error("Error deleting file from GridFS:", error);
    }

    // Delete document from database
    await Pyq.findByIdAndDelete(id);
    
    res.json({ 
      success: true, 
      message: "PYQ deleted successfully" 
    });
    
  } catch (error) {
    next(error);
  }
};