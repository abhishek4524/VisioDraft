import mongoose from 'mongoose';

const pyqSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  semester: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: String,
    required: true,
    trim: true
  },
  branch: {
    type: String,
    required: true,
    trim: true
  },
  file: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: String,
  },
    downloadCount: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

const Pyq = mongoose.model('Pyq', pyqSchema);
export default Pyq;