const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// Load environment variables
dotenv.config();

const app = express();

const connectDB = async () => {
  try {
    // Check if environment variable exists
    if (!process.env.MONGOURL) {
      throw new Error('MongoDB connection string not found in environment variables');
    }

    const mongoURI = process.env.MONGOURL;

    console.log('🔌 Attempting to connect to MongoDB...');
    console.log('📍 Connection string exists:', !!mongoURI);

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
      maxPoolSize: 5, // Maintain up to 10 socket connections
    });

    console.log("✅ Database connected successfully");
    console.log(`📊 Connected to: ${mongoose.connection.name || 'default'}`);

  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    console.error("🔍 Full error:", err);

    // Don't exit in production, let the app run
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

// Connect to database
connectDB();


// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173", // For local development
    "https://minor-project-1-authentication.vercel.app" // For frontend URL

  ],
  credentials: true
}));



// Middleware with error handling
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`📝 ${req.method} ${req.path}`, req.body ? 'with body' : 'no body');
    next();
  });
}

// Import routes
let authRoutes;
try {
  authRoutes = require("./routes/authRoutes");
} catch (err) {
  console.error("❌ Failed to load auth routes:", err.message);
}

// Mount routes
// Mount routes
if (authRoutes) {
  app.use("/api/auth", authRoutes);
}

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend API is running successfully! 🚀",
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV || 'development'
  });
});


// API health endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    database: mongoose.connection.readyState === 1,
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("🚨 Global error:", err);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});



// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Export the app for Vercel
module.exports = app;


// Start server locally
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
    console.log(`🌍 Access your API at: http://localhost:${port}`);
    console.log(`🔍 Health check: http://localhost:${port}/api/health`);
  });
}