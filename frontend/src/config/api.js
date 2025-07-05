// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    VERIFY: `${API_BASE_URL}/auth/verify`,
  },
  
  // Quiz endpoints
  QUIZ: {
    EASY: `${API_BASE_URL}/quiz/easy`,
    MEDIUM: `${API_BASE_URL}/quiz/medium`,
    HARD: `${API_BASE_URL}/quiz/hard`,
  },
  
  // Score endpoints
  SCORES: {
    SAVE: `${API_BASE_URL}/scores`,
    GET: `${API_BASE_URL}/scores`,
  },
  
  // Leaderboard endpoints
  LEADERBOARD: {
    GET: `${API_BASE_URL}/leaderboard`,
  },
  
  // Health check
  HEALTH: {
    STATUS: `${API_BASE_URL}/status`,
  }
};

// Default headers for API requests
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// Get authorization header
export const getAuthHeaders = () => {
  const token = localStorage.getItem('jwtToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default API_ENDPOINTS;