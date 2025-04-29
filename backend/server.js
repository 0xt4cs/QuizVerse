require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const quizRoutes = require("./routes/quizRoutes");
const leaderboardRoutes = require('./routes/leaderboardRoutes');

const app = express();

// DB Call
connectDB();

// Middleware
app.use(express.json()); 
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from frontend
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
