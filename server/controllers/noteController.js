import { v2 as cloudinary } from "cloudinary";
import noteModel from "../models/noteModel.js";
import path from "path";
import fs from "fs";

// ✅ Add a new note with only ONE file
const addNote = async (req, res) => {
  try {
    const { title, course, semester, branch, subject,noteType } = req.body;
    const uploadedBy = req.user?._id;

    if (!title || !course || !semester || !branch || !subject || !noteType || !uploadedBy) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Check if file is uploaded
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "A file is required" });
    }

    // ✅ Upload single file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "notes",
      resource_type: "auto",
    });

    const note = new noteModel({
      title,
      course,
      semester,
      branch,
      subject,
      noteType,
      uploadedBy,
      file: [result.secure_url], // still storing as array for future scalability
      date: Date.now(),
    });

    await note.save();

    res.status(201).json({
      success: true,
      message: "Note Added",
      note,
    });
  } catch (error) {
    console.error("Add Note Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to add note", error: error.message });
  }
};

// ✅ List all notes
const listNotes = async (req, res) => {
  try {
    const notes = await noteModel
      .find({})
      .populate("uploadedBy", "name email");
    res.json({ success: true, notes });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch notes" });
  }
};

// ✅ Remove a note
const removeNote = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Note ID is required" });
    }

    // Optional: delete file from cloudinary if stored with public_id
    // You can enhance this in future

    await noteModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Note Removed" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to remove note" });
  }
};

// ✅ Get a single note
const singleNote = async (req, res) => {
  try {
    const { noteId } = req.body;

    if (!noteId) {
      return res
        .status(400)
        .json({ success: false, message: "Note ID is required" });
    }

    const note = await noteModel
      .findById(noteId)
      .populate("uploadedBy", "name email");

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    res.json({ success: true, note });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch note" });
  }
};


// ✅ View Note (generate a viewable URL)
const viewNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await noteModel.findById(id);

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    if (!note.file || note.file.length === 0) {
      return res.status(404).json({ success: false, message: "No file found for this note" });
    }

    // Increment view count (optional)
    note.views = (note.views || 0) + 1;
    await note.save();

    const fileUrl = note.file[0];
    let viewUrl = fileUrl;

    // ✅ Fix: Agar PDF hai to direct original URL bhejo
    if (fileUrl.includes(".pdf")) {
      viewUrl = fileUrl.replace("/image/upload", "/raw/upload");
    }

    res.json({
      success: true,
      viewUrl,
    });
  } catch (error) {
    console.error("View Note Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to load note",
      error: error.message,
    });
  }
};

export { listNotes, addNote, removeNote, singleNote, viewNote };
