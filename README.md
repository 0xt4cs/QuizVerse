# QuizVerse

Hi there! I'm Jushtine Kylle Taculad. Welcome to QuizVerse, a final project I developed with my classmate John Rayvie Mendeja for our System Integration and Architecture 1 course.

QuizVerse is a full-stack web application allowing users to take quizzes on various topics, track their scores, and see how they rank on leaderboards. We aimed to create a functional and engaging quiz platform demonstrating the integration of frontend and backend technologies.

## Features

*   Google OAuth for user authentication
*   Quizzes categorized by difficulty (Easy, Medium, Hard)
*   Score tracking per user and category
*   Leaderboards for each difficulty category
*   Responsive design

## Tech Stack

We chose the following technologies for this project:

*   **Frontend:** React, Vite, Tailwind CSS, Material UI, React Router, Axios
*   **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, Google API Client Library
*   **Database:** MongoDB Atlas (or local MongoDB instance)

## Project Structure

```
QuizVerse/
├── backend/      # Node.js/Express backend
│   ├── config/     # DB connection, environment variables
│   ├── controllers/ # Request handling logic
│   ├── middlewares/ # Custom middleware (e.g., auth)
│   ├── models/     # Mongoose models
│   ├── routes/     # API route definitions
│   └── server.js   # Server entry point
├── frontend/     # React/Vite frontend
│   ├── public/     # Static assets
│   ├── src/
│   │   ├── assets/     # Images, etc.
│   │   ├── components/ # UI components (layout, pages, shared)
│   │   ├── context/    # React Context (e.g., AuthContext)
│   │   ├── App.jsx     # Root component with layout
│   │   └── main.jsx    # App entry point, routing setup
│   └── ...         # Config files (vite, tailwind, etc.)
└── README.md     # This file
└── LICENSE       # MIT License
```

## Getting Started

To get this running locally, please see the detailed instructions in the README files within the `backend` and `frontend` directories.

## Authors

*   **Jushtine Kylle Taculad**
*   **John Rayvie Mendeja**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 