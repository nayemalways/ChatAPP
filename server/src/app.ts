/* eslint-disable no-console */
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { GlobalRoutes } from "./router/routes";
import { globalErrorhandler } from "./app/middleware/globalErrorHandler";
import { NotFound } from "./app/middleware/NotFound";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: { origin: "*" },
});

// Store online users
export const userSocketMap: Record<string, string> = {}; // { 68ffc62329d8c39088f0d241: 68ffc62329d8c39088f0d241 }

// socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId as string;
  console.log("User connected: ", userId);

  if (userId) userSocketMap[userId] = socket.id;

  // Emit online user's to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected: ", userId);
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Middleware setup
app.use(
  cors({
    origin: "https://chatapp-frontend-self-three.vercel.app"
  })
);

app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the show");
});

app.use("/api/v1", GlobalRoutes);

app.use(NotFound);
app.use(globalErrorhandler);

export default server;
