import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import jobRoutes from "./routes/jobs.js";
import matchRoutes from "./routes/match.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// Middleware: parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Integrate Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/admin", adminRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.error("DB Connection Error:", err));

// Create HTTP server and Socket.IO instance
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// Basic Socket.IO connection
io.on("connection", (socket) => {
  console.log("New client connected: ", socket.id);
  socket.on("sendMessage", (data) => {
    // Broadcast message to all clients
    io.emit("receiveMessage", data);
  });
  socket.on("disconnect", () => console.log("Client disconnected: ", socket.id));
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
