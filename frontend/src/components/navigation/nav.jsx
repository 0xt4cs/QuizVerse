import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { PowerSettingsNew } from "@mui/icons-material";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

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

export default function Navigation() {
  const { logout: authLogout } = useAuth();
  const [notification, setNotification] = useState(null);

  const handleLogout = () => {
    setNotification({ message: "Logout Successful! Redirecting...", type: "success" });
    
    setTimeout(() => {
      authLogout();
    }, 1500);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <>
      <div className="w-screen h-[70px] flex justify-center items-center sticky top-0 z-50 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10 animate-slidedown">
        <div className="h-full w-[70%] flex justify-between items-center">
          <div className="flex justify-center items-center h-full w-[10%]">
            <img className="h-[50%] w-auto" src="/quiz.png" alt="Quiz Logo" />
          </div>
          <div className="h-full w-[40%] flex items-center justify-end gap-[20px] text-white">
            <Link
              className="hover:text-cyan-400 text-[20px] after:block after:content-[''] after:w-[0] after:transition-all after:relative after:h-[2px] after:bg-gradient-to-r after:from-cyan-400 after:to-violet-500 after:translate-x-[-9%] after:rounded-full hover:after:w-[120%] ease-in-out duration-500"
              to={"/"}
            >
              Home
            </Link>
            <Link
              className="hover:text-cyan-400 text-[20px] after:block after:content-[''] after:w-[0] after:transition-all after:relative after:h-[2px] after:bg-gradient-to-r after:from-cyan-400 after:to-violet-500 after:translate-x-[-9%] after:rounded-full hover:after:w-[120%] ease-in-out duration-500"
              to={"/quiz"}
            >
              Quiz
            </Link>
            <Link
              className="hover:text-cyan-400 text-[20px] after:block after:content-[''] after:w-[0] after:transition-all after:relative after:h-[2px] after:bg-gradient-to-r after:from-cyan-400 after:to-violet-500 after:translate-x-[-9%] after:rounded-full hover:after:w-[120%] ease-in-out duration-500"
              to={"/quiz/leaderboard"}
            >
              Leaderboard
            </Link>
            <Link
              className="hover:text-cyan-400 text-[20px] after:block after:content-[''] after:w-[0] after:transition-all after:relative after:h-[2px] after:bg-gradient-to-r after:from-cyan-400 after:to-violet-500 after:translate-x-[-9%] after:rounded-full hover:after:w-[120%] ease-in-out duration-500"
              to={"/Aboutus"}
            >
              About us
            </Link>
          </div>

          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Button
              onClick={handleLogout}
              variant="outlined"
              color="error"
              className="items-center"
            >
              <PowerSettingsNew /> 
            </Button>
          </div>
        </div>
      </div>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </>
  );
}
