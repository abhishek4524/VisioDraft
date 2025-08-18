import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import noteRouter from './routes/noteRoute..js';
import pyqRouter from "./routes/pyqRouter.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // for x-www-form-urlencoded

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/note', noteRouter);
app.use("/api/pyqs", pyqRouter);

app.get('/', (req, res) => {
    res.send("API Working");
});

app.listen(port, () => console.log(`✅ Server started on http://localhost:${port}`));