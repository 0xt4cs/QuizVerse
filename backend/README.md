# QuizVerse Backend

This directory contains the Node.js/Express backend server for the QuizVerse application.

## Features

*   Handles user authentication (Google OAuth, JWT sessions).
*   Provides API endpoints for quizzes, scores, and leaderboards.
*   Connects to a MongoDB database.

## Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file:**
    Create a file named `.env` in the `backend` directory and add the following environment variables:

    ```dotenv
    # Server Configuration
    PORT=5000

    # MongoDB Connection
    MONGODB_URI=your_mongodb_connection_string # Replace with your MongoDB Atlas or local DB connection string

    # JWT Configuration
    JWT_SECRET=your_strong_jwt_secret # Replace with a strong, random secret key

    # Google OAuth Credentials (Optional - handled by frontend, but secret needed for JWT)
    # You need these if you plan to verify ID tokens on the backend in the future
    # GOOGLE_CLIENT_ID=your_google_client_id
    # GOOGLE_CLIENT_SECRET=your_google_client_secret 
    ```
    *   Replace placeholders with your actual MongoDB connection string and a secure JWT secret.

## Running the Server

*   **Development Mode:**
    ```bash
    npm start
    ```
    This will start the server (usually on `http://localhost:5000`) using `node server.js`.

## API Endpoints

*   `POST /api/auth/google`: Handles Google login/signup.
*   `GET /api/quiz/:difficulty`: Fetches quiz questions by difficulty (requires auth).
*   `POST /api/scores`: Saves or updates a user's score for a specific difficulty (requires auth).
*   `GET /api/leaderboard`: Fetches the leaderboard data for all categories. 