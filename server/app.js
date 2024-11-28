import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import globalErrorHandler from "./middlewares/errorHandler.middleware.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "http://localhost:3000",
      "http://127.0.0.1:5500",
      "http://192.168.197.51:3000",
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/todos", todoRoutes);

// Static Files
app.use(express.static(path.join(__dirname, "..", "client")));

// Frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "login.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "register.html"));
});
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dashboard.html"));
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
