import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import noteRouter from './routes/noteRoute..js';
import pyqRouter from "./routes/pyqRouter.js";
import communityRouter from "./routes/communityRoute.js";

// ⬇️ Message model (banani padegi server/models/Message.js me)
import Message from "./models/Message.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: [
    'https://visio-client.vercel.app',
    'https://visio-admin.vercel.app'
  ],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/note', noteRouter);
app.use("/api/pyqs", pyqRouter);
app.use('/api/community', communityRouter);

app.get('/', (req, res) => {
    res.send("API Working ✅");
});

// ---------------- SOCKET.IO SETUP ---------------- //
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "*", // React client URL
    methods: ["GET", "POST"]
  }
});

// middleware: authenticate socket using JWT (optional)
io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;
    if (!token) return next();
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = { id: payload.id, name: payload.name };
    next();
  } catch (err) {
    next(); // allow guest if no/invalid token
  }
});

io.on("connection", (socket) => {
  console.log("✅ Socket connected:", socket.id, socket.user?.id || "guest");

  // Join a community (room)
  socket.on("joinCommunity", ({ communityId }) => {
    if (!communityId) return;
    socket.join(communityId);
    io.to(communityId).emit("systemMessage", {
      text: `${socket.user?.name || "Guest"} joined`,
      timestamp: new Date()
    });
  });

  // Leave a community
  socket.on("leaveCommunity", ({ communityId }) => {
    socket.leave(communityId);
  });

  // Send message
  socket.on("sendMessage", async ({ communityId, text }) => {
    if (!communityId || !text) return;
    const cleanText = String(text).slice(0, 1000);

    const msg = new Message({
      communityId,
      senderId: socket.user?.id || socket.id,
      senderName: socket.user?.name || "Guest",
      text: cleanText
    });

    try {
      const saved = await msg.save();
      io.to(communityId).emit("receiveMessage", {
        id: saved._id,
        communityId: saved.communityId,
        senderId: saved.senderId,
        senderName: saved.senderName,
        text: saved.text,
        createdAt: saved.createdAt
      });
    } catch (err) {
      console.error("❌ Message save error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});

// API endpoint: fetch community messages (history)
app.get("/api/communities/:communityId/messages", async (req, res) => {
  try {
    const { communityId } = req.params;
    const limit = Math.min(Number(req.query.limit) || 50, 200);
    const messages = await Message.find({ communityId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    res.json(messages.reverse());
  } catch (err) {
    res.status(500).json({ error: "Failed to load messages" });
  }
});

// Start server (important: use `server.listen`)
server.listen(port, () => 
    console.log(`✅ Server started on http://localhost:${port}`)
);
