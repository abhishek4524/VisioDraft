// multer.js
import multer from "multer";
import fs from "fs";
import path from "path";

// Make sure uploads folder exists (cross-platform path)
const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer disk storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // store in uploads/ directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // keep original filename
  }
});

// Multer upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
});

export default upload;
