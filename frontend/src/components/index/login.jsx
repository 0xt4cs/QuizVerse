import React, { useState } from "react";
import { Google } from "@mui/icons-material";
// No longer need useNavigate here as AuthContext handles navigation
// import { useNavigate } from "react-router-dom"; 
import { useGoogleLogin } from "@react-oauth/google";
import FooterName from '../footer/footerName';
import { useAuth } from "../../context/AuthContext"; // Import useAuth

// Notification Component
const Notification = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed z-50 text-white p-4 rounded-lg shadow-lg ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } bottom-4 right-4 animate-slidedown`} 
    >
      {message}
      <button
        onClick={onClose}
        className="ml-4 text-lg text-white"
      >
        &times;
      </button>
    </div>
  );
};

export default function Login() {
  // const navigate = useNavigate(); // No longer needed directly
  const [notification, setNotification] = useState(null); // Keep for feedback
  const [errorNotification, setErrorNotification] = useState(null); // For error messages
  const { login: authLogin } = useAuth(); // Get login function from context

  const handleLoginSuccess = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ access_token: tokenResponse.access_token }),
        });

        const data = await response.json();

        if (data.success && data.token) {
          // Call context login function
          authLogin(data.token); 
          // Show success notification (optional, context handles navigation)
          setNotification({ message: "Login Successful! Redirecting...", type: "success" });
          // No need for manual navigation or reload, context handles it
          // setTimeout(() => {
          //   navigate("/");
          //   window.location.reload();
          // }, 1500); 
        } else {
          console.error("Login failed:", data.message);
           setErrorNotification({ message: data.message || "Login failed. Please try again.", type: "error" });
        }
      } catch (error) {
        console.error("An error occurred during login:", error);
        setErrorNotification({ message: "An error occurred. Please try again.", type: "error" });
      }
    },
    onError: (error) => {
      console.error("Google Login error:", error);
      setErrorNotification({ message: "Google Login failed. Please try again.", type: "error" });
    },
  });

  const closeNotification = () => {
    setNotification(null);
    setErrorNotification(null);
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="flex flex-col justify-center items-center w-[70%] h-[92%] gap-8">
        <div className="flex items-center h-[160px] gap-5 animate-slidedown">
          <img
            className="h-full w-auto"
            src="/quizverse.png"
            alt="QuizVerse Logo"
          />
        </div>

        <div className="w-[73%] text-[20px] text-white animate-slideup">
          <p className="text-center font-Josefin-Sans">
            Welcome to QuizVerse! Please sign in to access quizzes and track your progress.
          </p>
        </div>

        <div className="mt-[30px] animate-slideup">
          <button
            onClick={() => login()}
            className="flex items-center gap-3 border-[1px] bg-[#050820] border-white text-[22px] text-white px-[60px] py-[10px] rounded-full hover:bg-white hover:text-[#050820] transition-all duration-500"
          >
            <Google className="w-6 h-6" />
            Sign in with Google
          </button>
        </div>
      </div>

      {notification && (
        <Notification
          message={notification}
          type="success"
          onClose={closeNotification}
        />
      )}

      <div className="w-screen flex items-center justify-center">
        <FooterName />
      </div>
    </div>
  );
}
