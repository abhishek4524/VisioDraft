import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import fetch from 'node-fetch';

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
const KEY = process.env.YT_API_KEY;

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());
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


app.post('/api/ask', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",  // you can use other models too
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    res.json({ reply: data.choices?.[0]?.message?.content || "Sorry, I didn’t get that." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Server error." });
  }
});


// API endpoint: YouTube Top 5 Videos

app.get('/api/search', async (req, res) => {
  try {
    const q = req.query.q || '';
    const from = req.query.from;
    const to = req.query.to;

    const searchParams = new URLSearchParams({
      key: KEY,
      part: 'snippet',
      q,
      type: 'video',
      maxResults: '50',
      order: 'viewCount'
    });
    if (from) searchParams.append('publishedAfter', new Date(from).toISOString());
    if (to) searchParams.append('publishedBefore', new Date(to).toISOString());

    const searchResp = await fetch(`https://www.googleapis.com/youtube/v3/search?${searchParams.toString()}`);
    const searchJson = await searchResp.json();
    const ids = searchJson.items.map(i => i.id.videoId).filter(Boolean);

    if (ids.length === 0) return res.json({ items: [] });

    const vidParams = new URLSearchParams({
      key: KEY,
      part: 'snippet,statistics',
      id: ids.join(',')
    });
    const videosResp = await fetch(`https://www.googleapis.com/youtube/v3/videos?${vidParams.toString()}`);
    const videosJson = await videosResp.json();

    const items = videosJson.items.map(v => ({
      id: v.id,
      title: v.snippet.title,
      channel: v.snippet.channelTitle,
      thumbnail: v.snippet.thumbnails.high.url,
      publishedAt: v.snippet.publishedAt,
      viewCount: Number(v.statistics.viewCount || 0),
      likeCount: Number(v.statistics.likeCount || 0),
      embedUrl: `https://www.youtube.com/embed/${v.id}`
    }));

    const sortBy = req.query.sort === 'likes' ? 'likeCount' : 'viewCount';
    items.sort((a,b) => b[sortBy] - a[sortBy]);

    res.json({ items: items.slice(0,5) });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});



// Start server (important: use `server.listen`)
server.listen(port, () => 
    console.log(`✅ Server started on http://localhost:${port}`)
);
