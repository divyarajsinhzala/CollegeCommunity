const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

// 1. MUST LOAD ENV FIRST
dotenv.config();

// 2. CONNECT DB
connectDB();

// Route Imports
const userRoutes = require("./routes/userRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const eventRoutes = require("./routes/eventRoutes");
const messageRoutes = require("./routes/messageRoutes");

// Middleware Imports
const { protect, admin } = require("./middleware/authMiddleware");

// Models
const Message = require("./models/Message");

const app = express();

// Standard Middleware
app.use(cors());
app.use(express.json());

// API Endpoints
app.use("/api/users", userRoutes); 
app.use("/api/announcements", announcementRoutes);
app.use("/api/events", protect, eventRoutes);
app.use("/api/messages", protect, admin, messageRoutes);

// Socket.io Setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  socket.on("join_room", async (roomName) => {
    socket.join(roomName);
    try {
      const history = await Message.find({ room: roomName, status: "Visible" }).sort({ createdAt: 1 });
      socket.emit("load_messages", history);
    } catch (err) {
      console.error("Socket Load Error:", err);
    }
  });

  socket.on("send_message", async (data) => {
    try {
      const newMessage = new Message({ ...data, status: "Visible" });
      const savedMsg = await newMessage.save();
      io.to(data.room).emit("receive_message", savedMsg);
    } catch (err) {
      console.error("Socket Save Error:", err);
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server active on port ${PORT}`));