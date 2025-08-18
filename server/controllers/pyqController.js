import Pyq from '../models/pyqModel.js';

// Upload PYQ (Admin only)
export const uploadPyq = async (req, res, next) => {
  try {
    const { title,description, course, semester, branch, subject, year,uploadedBy } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const newPyq = new Pyq({
      title,
      description,
      course,
      semester,
      branch,
      year,
      subject,
      file: req.file.path,
      uploadedBy
    });

    await newPyq.save();

    res.status(201).json({ 
      success: true, 
      message: "PYQ uploaded successfully",
      data: {
        id: newPyq._id,
        title: newPyq.title,
        file: newPyq.file
      }
    });
  } catch (error) {
    next(error);
  }
  
};

// Get all PYQs (Public)
export const getAllPyqs = async (req, res, next) => {
  try {
    const pyqs = await Pyq.find().select('-__v').populate('uploadedBy', 'email');
    res.json({ success: true, data: pyqs });
  } catch (error) {
    next(error);
  }
};

// Get single PYQ (Public)
export const getPyqById = async (req, res, next) => {
  try {
    const pyq = await Pyq.findById(req.params.id).select('-__v');
    if (!pyq) {
      return res.status(404).json({ success: false, message: "PYQ not found" });
    }
    res.json({ success: true, data: pyq });
  } catch (error) {
    next(error);
  }
};