require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const quizRoutes = require("./routes/quizRoutes");
const leaderboardRoutes = require('./routes/leaderboardRoutes');

const app = express();

// DB Call
connectDB();

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for development, configure properly in production
  crossOriginEmbedderPolicy: false // Allow embedding for OAuth
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: (process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000, // 15 minutes by default
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiting to all requests
app.use(limiter);

// Middleware
app.use(express.json({ limit: '10mb' })); // Add body size limit 
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Use environment variable
    credentials: true, // Allow cookies/credentials
  })
);

// fix some cors issue
app.use((req, res, next) => { 
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// Base API Routes
app.use("/api/auth", authRoutes); 
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/quiz", quizRoutes); 

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    version: process.env.npm_package_version || "1.0.0"
  });
});

// API Status Endpoint
app.get("/api/status", (req, res) => {
  res.status(200).json({
    message: "QuizVerse API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
}); 


// Global error handler
app.use((err, req, res, next) => {
  // Determine the status code: use error's status/statusCode if available, otherwise default to 500
  const statusCode = err.status || err.statusCode || 500;
  
  // Determine the message: use error's message, otherwise a generic one
  const message = err.message || "Internal server error";

  // Log the error details (consider logging less in production)
  console.error(`[${new Date().toISOString()}] ${statusCode} - ${message}`);
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  // Send the response
  res.status(statusCode).json({
    success: false,
    message: message,
    // Optionally include stack trace in development environment response
    // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Server Starter
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
