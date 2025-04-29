# QuizVerse Frontend

This directory contains the React/Vite frontend application for QuizVerse.

## Features

*   User interface for login, quizzes, leaderboards, and profile.
*   Integrates with Google OAuth for login.
*   Communicates with the backend API to fetch data and save scores.
*   Uses React Router for navigation.
*   Styled with Tailwind CSS and Material UI components.

## Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Environment Variables:**
    The Google Client ID is currently hardcoded in `src/main.jsx`. For better practice, you could move this to a `.env` file in the `frontend` directory:

    ```dotenv
    # In frontend/.env
    VITE_GOOGLE_CLIENT_ID=your_google_client_id 
    ```
    *   Replace `your_google_client_id` with the actual Client ID obtained from Google Cloud Console for your OAuth 2.0 Credentials.
    *   Update `src/main.jsx` to use `import.meta.env.VITE_GOOGLE_CLIENT_ID`.
    *   **Important:** Ensure your Google Cloud OAuth credentials are configured to allow requests from `http://localhost:5173` (or your development origin) and your production domain.

## Running the Frontend

1.  **Ensure the backend server is running.**
2.  **Start the development server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server, typically on `http://localhost:5173`.

## Building for Production

```bash
npm run build
```
This command builds the application for production, outputting the static files to the `dist` directory.
