import express from 'express';
import { uploadPyq, getAllPyqs, getPyqById } from '../controllers/pyqController.js';
import verifyAdmin from '../middleware/adminAuth.js';
import upload from '../config/multerConfig.js';

const router = express.Router();

// Admin routes
router.post('/upload', verifyAdmin, upload.single('file'), uploadPyq);

// Public routes
router.get('/', getAllPyqs);
router.get('/:id', getPyqById);

export default router;