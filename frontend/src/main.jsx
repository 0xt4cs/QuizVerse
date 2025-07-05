import './index.css';
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import Home from './components/index/home';
import Quiz from './components/quiz/quiz';
import Leaderboard from './components/quiz/leaderboard';  
import About from './components/profile/profile';
import Easy from './components/quiz/easy';
import Medium from './components/quiz/medium';
import Hard from './components/quiz/hard';
import Login from './components/index/login';
import ProtectedRoute from './components/utils/protectedroutes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './context/AuthContext';

// Component to handle conditional rendering based on auth state
const PublicRoutes = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Home /> : <Login />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </GoogleOAuthProvider>
    ),
    children: [
      {
        path: "/",
        element: <PublicRoutes />, 
      },
      {
        path: "quiz",
        element: (
          <ProtectedRoute>
            <Quiz />
          </ProtectedRoute>
        ),
      },
      {
        path: "aboutus",
        element: <About />,
      },
      {
        path: "/quiz/easy",
        element: (
          <ProtectedRoute>
            <Easy />
          </ProtectedRoute>
        ),
      },
      {
        path: "/quiz/medium",
        element: (
          <ProtectedRoute>
            <Medium />
          </ProtectedRoute>
        ),
      },
      {
        path: "/quiz/hard",
        element: (
          <ProtectedRoute>
            <Hard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/quiz/leaderboard",
        element: (
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <PublicRoutes />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
