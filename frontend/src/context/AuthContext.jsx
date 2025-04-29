import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Check token validity on initial load (optional: add verification call to backend)
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    } else {
      setToken(null);
      setIsAuthenticated(false);
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem('jwtToken', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
     // Navigate to home after login - UX improvement
     navigate('/'); 
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setToken(null);
    setIsAuthenticated(false);
     // Navigate to login after logout - UX improvement
    navigate('/login'); 
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 