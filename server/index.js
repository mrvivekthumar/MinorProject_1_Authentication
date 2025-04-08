const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();

// Load environment variables
dotenv.config();

// Database connection
mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.log("❌ Database connection failed:", err));

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Import routes
const authRoutes = require("./routes/authRoutes");

// Mount routes
app.use("/api/auth", authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`🚀 Server is running on port ${port}`));
