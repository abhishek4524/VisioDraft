// controllers/pyqController.js
import Pyq from "../models/pyqModel.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// OPTIONAL: if you use cloudinary
// import { v2 as cloudinary } from "cloudinary";
// cloudinary.config({ cloud_name: ..., api_key: ..., api_secret: ... });

const UPLOAD_DIR = path.join(process.cwd(), "uploads", "pyqs");

// Helper: ensure folder exists
function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

// Upload PYQ (supports: local | gridfs | cloudinary)
// Decide mode via req.body.storageMode or default 'local'
export const uploadPyq = async (req, res, next) => {
  try {
    ensureUploadDir();

    const {
      title,
      description,
      course,
      semester,
      branch,
      subject,
      year,
      uploadedBy,
      storageMode = "gridfs", // "local" | "gridfs" | "cloudinary"
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    if (!title || !course || !semester || !branch || !subject || !year) {
      // DON'T delete here unless you are sure it is temp. If multer dest is already UPLOAD_DIR, keep it.
      return res.status(400).json({
        success: false,
        message: "Missing required fields: title, course, semester, branch, subject, year",
      });
    }

    const mimeType = req.file.mimetype || "application/pdf";
    const originalName = req.file.originalname || "file.pdf";

    let storedRef = null;
    let fileNameToKeep = null;
    let sizeToKeep = null;
    let cloudinaryUrl = null;

    if (storageMode === "gridfs") {
      // ---- GRIDFS UPLOAD ----
      const db = mongoose.connection.db;
      const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "pyqs" });

      // Open a stream from the local temp path to GridFS
      const uploadStream = bucket.openUploadStream(originalName, { contentType: mimeType });
      await new Promise((resolve, reject) => {
        fs.createReadStream(req.file.path)
          .on("error", reject)
          .pipe(uploadStream)
          .on("error", reject)
          .on("finish", resolve);
      });

      // Save reference
      storedRef = uploadStream.id.toString();
      fileNameToKeep = originalName;
      sizeToKeep = uploadStream.length || req.file.size;

      // Now it's safe to remove local temp
      try { fs.unlinkSync(req.file.path); } catch {}

    } else if (storageMode === "cloudinary") {
      // ---- CLOUDINARY UPLOAD (as raw) ----
      // const result = await cloudinary.uploader.upload(req.file.path, {
      //   resource_type: "raw",
      //   folder: "pyqs",
      //   use_filename: true,
      //   unique_filename: false,
      // });
      // cloudinaryUrl = result.secure_url;
      // fileNameToKeep = originalName;
      // sizeToKeep = result.bytes;
      // storedRef = `cloudinary://${result.public_id}`;

      // If you haven't configured Cloudinary yet, fall back to local:
      const relPath = path.relative(process.cwd(), req.file.path);
      storedRef = `local://${path.basename(relPath)}`;
      const stat = fs.statSync(req.file.path);
      sizeToKeep = stat.size;
      fileNameToKeep = originalName;

    } else {
      // ---- LOCAL UPLOAD ----
      // If multer is already saving into UPLOAD_DIR, do nothing.
      // Otherwise, move to UPLOAD_DIR:
      const currentPath = req.file.path;
      const finalPath = path.join(UPLOAD_DIR, req.file.filename);
      if (currentPath !== finalPath) {
        fs.copyFileSync(currentPath, finalPath);
        try { fs.unlinkSync(currentPath); } catch {}
      }
      const stat = fs.statSync(finalPath);
      sizeToKeep = stat.size;
      fileNameToKeep = originalName;
      storedRef = `local://${req.file.filename}`;
    }

    const newPyq = new Pyq({
      title,
      description: description || "",
      course,
      semester,
      branch,
      year,
      subject,
      file: storedRef,                 // local://FILENAME | <gridfsId> | cloudinary://public_id
      fileSize: sizeToKeep,
      fileName: fileNameToKeep,
      mimeType,
      cloudinaryUrl: cloudinaryUrl || undefined, // add this field in schema (String) if you use cloudinary
      uploadedBy: uploadedBy || "admin",
      downloadCount: 0,
    });

    await newPyq.save();

    res.status(201).json({
      success: true,
      message: `PYQ uploaded successfully (${storageMode})`,
      data: { id: newPyq._id, title: newPyq.title, file: newPyq.file },
    });
  } catch (error) {
    console.error("PYQ upload error:", error);
    next(error);
  }
};

// Download
export const downloadPyq = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid PYQ ID" });
    }

    // increment safely
    const pyq = await Pyq.findByIdAndUpdate(
      id,
      { $inc: { downloadCount: 1 } },
      { new: true }
    );
    if (!pyq) {
      return res.status(404).json({ success: false, message: "PYQ not found" });
    }

    const safeName = (pyq.fileName || "file.pdf").replace(/[/\\]/g, "_");

    // ---- LOCAL ----
    if (pyq.file.startsWith("local://")) {
      const filename = pyq.file.replace("local://", "");
      const filePath = path.join(UPLOAD_DIR, filename);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ success: false, message: "File not found in storage" });
      }

      // Get real size from disk, NOT DB
      const stat = fs.statSync(filePath);

      res.set({
        "Content-Type": pyq.mimeType || "application/pdf",
        "Content-Disposition": `attachment; filename="${safeName}"`,
        "Content-Length": stat.size,
        "Cache-Control": "private, max-age=0, no-cache",
      });

      const stream = fs.createReadStream(filePath);
      stream.on("error", next);
      return stream.pipe(res);
    }

    // ---- CLOUDINARY ----
    if (pyq.file.startsWith("cloudinary://") && pyq.cloudinaryUrl) {
      // Force download via Cloudinary with attachment filename
      const url = `${pyq.cloudinaryUrl}${pyq.cloudinaryUrl.includes("?") ? "&" : "?"}fl_attachment=${encodeURIComponent(safeName)}`;
      // Easiest and most reliable: redirect (browser will download directly, avoids CORS/stream issues)
      return res.redirect(302, url);
    }

    // ---- GRIDFS ----
    const db = mongoose.connection.db;
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "pyqs" });

    let fileId;
    try {
      fileId = new mongoose.Types.ObjectId(pyq.file);
    } catch {
      return res.status(400).json({ success: false, message: "Invalid file ID format" });
    }

    const files = await bucket.find({ _id: fileId }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ success: false, message: "File not found in GridFS storage" });
    }

    const file = files[0];
    res.set({
      "Content-Type": file.contentType || pyq.mimeType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${safeName}"`,
      "Content-Length": file.length,
      "Cache-Control": "private, max-age=0, no-cache",
    });

    const downloadStream = bucket.openDownloadStream(fileId);
    downloadStream.on("error", next);
    return downloadStream.pipe(res);
  } catch (error) {
    console.error("Download error:", error);
    next(error);
  }
};

// Delete
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

    if (pyq.file.startsWith("local://")) {
      const filename = pyq.file.replace("local://", "");
      const filePath = path.join(UPLOAD_DIR, filename);
      try { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); } catch (e) { console.warn(e); }
    } else if (pyq.file.startsWith("cloudinary://") && pyq.cloudinaryUrl) {
      // OPTIONAL: delete from cloudinary using public_id
      // const publicId = pyq.file.replace("cloudinary://", "");
      // await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
    } else {
      const db = mongoose.connection.db;
      const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "pyqs" });
      try {
        const fileId = new mongoose.Types.ObjectId(pyq.file);
        await bucket.delete(fileId);
      } catch (e) { console.warn("GridFS delete error:", e); }
    }

    await Pyq.findByIdAndDelete(id);
    res.json({ success: true, message: "PYQ deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Keep the other functions the same...
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