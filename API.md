# QuizVerse API Documentation

Base URL: `http://localhost:5000/api` (development) | `https://your-domain.com/api` (production)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Rate Limiting

- **Window**: 15 minutes (configurable)
- **Max Requests**: 100 per window (configurable)
- **Headers**: `RateLimit-*` headers included in responses

## Health Check Endpoints

### Get Application Health
```http
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "environment": "production",
  "version": "1.0.0"
}
```

### Get API Status
```http
GET /api/status
```

**Response:**
```json
{
  "message": "QuizVerse API is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "production"
}
```

## Authentication Endpoints

### Google OAuth Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "token": "google-oauth-token"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "User Name",
    "email": "user@example.com",
    "picture": "profile-picture-url"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Invalid token"
}
```

### Verify Token
```http
GET /api/auth/verify
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "name": "User Name",
    "email": "user@example.com"
  }
}
```

## Quiz Endpoints

All quiz endpoints require authentication.

### Get Easy Quiz
```http
GET /api/quiz/easy
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "questions": [
    {
      "category": "General Knowledge",
      "type": "boolean",
      "difficulty": "easy",
      "question": "The Great Wall of China is visible from space.",
      "correct_answer": "False",
      "incorrect_answers": ["True"]
    }
  ]
}
```

### Get Medium Quiz
```http
GET /api/quiz/medium
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "questions": [
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "medium",
      "question": "What does CPU stand for?",
      "correct_answer": "Central Processing Unit",
      "incorrect_answers": [
        "Central Process Unit",
        "Computer Personal Unit",
        "Central Processor Unit"
      ]
    }
  ]
}
```

### Get Hard Quiz
```http
GET /api/quiz/hard
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "questions": [
    {
      "category": "Science: Mathematics",
      "type": "multiple",
      "difficulty": "hard",
      "question": "What is the derivative of x^2?",
      "correct_answer": "2x",
      "incorrect_answers": ["x^2", "x", "2x^2"]
    }
  ]
}
```

**Error Responses:**
```json
{
  "success": false,
  "message": "Invalid difficulty level"
}
```

```json
{
  "success": false,
  "message": "Failed to fetch questions"
}
```

## Score Endpoints

### Save or Update Score
```http
POST /api/scores
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "score": 8,
  "difficulty": "hard"
}
```

**Validation Rules:**
- `score`: Must be a positive number
- `difficulty`: Must be one of: "easy", "medium", "hard"

**Response (New Score):**
```json
{
  "success": true,
  "message": "Score saved successfully",
  "retakeCount": 1
}
```

**Response (Updated Score):**
```json
{
  "success": true,
  "message": "Score updated and retake count incremented",
  "retakeCount": 3
}
```

**Validation Error Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "type": "field",
      "value": "invalid",
      "msg": "Difficulty must be one of: easy, medium, hard",
      "path": "difficulty",
      "location": "body"
    }
  ]
}
```

### Get User Scores
```http
GET /api/scores
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "scores": {
    "userId": "user-id",
    "scores": [
      {
        "category": "easy",
        "score": 9,
        "retakeCount": 2
      },
      {
        "category": "medium",
        "score": 7,
        "retakeCount": 1
      },
      {
        "category": "hard",
        "score": 5,
        "retakeCount": 3
      }
    ]
  }
}
```

## Leaderboard Endpoints

### Get Global Leaderboard
```http
GET /api/leaderboard
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `difficulty` (optional): Filter by difficulty ("easy", "medium", "hard")
- `limit` (optional): Number of results (default: 10)

**Response:**
```json
{
  "success": true,
  "leaderboard": [
    {
      "userId": "user-id-1",
      "userName": "John Doe",
      "userEmail": "john@example.com",
      "difficulty": "hard",
      "score": 10,
      "retakeCount": 1,
      "rank": 1
    },
    {
      "userId": "user-id-2",
      "userName": "Jane Smith",
      "userEmail": "jane@example.com",
      "difficulty": "hard",
      "score": 9,
      "retakeCount": 2,
      "rank": 2
    }
  ]
}
```

### Get Leaderboard by Difficulty
```http
GET /api/leaderboard?difficulty=hard&limit=5
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "leaderboard": [
    {
      "userId": "user-id",
      "userName": "User Name",
      "userEmail": "user@example.com",
      "difficulty": "hard",
      "score": 8,
      "retakeCount": 3,
      "rank": 1
    }
  ]
}
```

## Error Handling

### Standard Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "error": "Technical error details (development only)"
}
```

### HTTP Status Codes

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Authentication required or invalid token
- **403 Forbidden**: Access denied
- **404 Not Found**: Resource not found
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server error

### Common Error Messages

```json
{
  "success": false,
  "message": "Unauthorized: No token provided"
}
```

```json
{
  "success": false,
  "message": "Unauthorized: Invalid token"
}
```

```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

## API Versioning

Current API version: **v1**

The API uses URL versioning. Future versions will be available at:
- `https://your-domain.com/api/v2/`

## CORS Configuration

The API supports CORS for the following origins:
- Development: `http://localhost:5173`
- Production: Configured via `FRONTEND_URL` environment variable

## Request/Response Examples

### cURL Examples

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"token": "google-oauth-token"}'
```

**Get Quiz:**
```bash
curl -X GET http://localhost:5000/api/quiz/easy \
  -H "Authorization: Bearer your-jwt-token"
```

**Save Score:**
```bash
curl -X POST http://localhost:5000/api/scores \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{"score": 8, "difficulty": "medium"}'
```

**Get Leaderboard:**
```bash
curl -X GET "http://localhost:5000/api/leaderboard?difficulty=hard&limit=5" \
  -H "Authorization: Bearer your-jwt-token"
```

### JavaScript Examples

**Using Axios:**
```javascript
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';
const token = localStorage.getItem('jwtToken');

// Get quiz
const getQuiz = async (difficulty) => {
  try {
    const response = await axios.get(`${API_BASE}/quiz/${difficulty}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Quiz fetch error:', error.response.data);
  }
};

// Save score
const saveScore = async (score, difficulty) => {
  try {
    const response = await axios.post(`${API_BASE}/scores`, 
      { score, difficulty },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Score save error:', error.response.data);
  }
};
```

## Environment Configuration

### Required Environment Variables

**Backend:**
```env
MONGO_URI=mongodb://localhost:27017/quizverse
JWT_SECRET=your-super-secret-jwt-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FRONTEND_URL=http://localhost:5173
```

**Frontend:**
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

## Testing

### Health Check Test
```bash
# Test application health
curl http://localhost:5000/health

# Expected response:
# {"status":"OK","timestamp":"...","uptime":...}
```

### API Test Script
```bash
#!/bin/bash

BASE_URL="http://localhost:5000"

echo "Testing Health Check..."
curl -s "$BASE_URL/health" | jq .

echo "Testing API Status..."
curl -s "$BASE_URL/api/status" | jq .

echo "Testing Rate Limiting..."
for i in {1..5}; do
  curl -s "$BASE_URL/api/status" -I | grep -i rate
done
```

## Rate Limiting Details

The API implements rate limiting to prevent abuse:

- **Window**: 15 minutes (configurable via `RATE_LIMIT_WINDOW`)
- **Maximum Requests**: 100 per window (configurable via `RATE_LIMIT_MAX_REQUESTS`)
- **Headers Included**:
  - `RateLimit-Limit`: Maximum requests allowed
  - `RateLimit-Remaining`: Requests remaining in current window
  - `RateLimit-Reset`: Time when the rate limit resets

When rate limit is exceeded:
```json
{
  "error": "Too many requests from this IP, please try again later."
}
```

## Security Features

1. **JWT Authentication**: Secure token-based authentication
2. **Input Validation**: All inputs validated using express-validator
3. **Rate Limiting**: Prevents API abuse
4. **Security Headers**: Helmet.js for security headers
5. **CORS Configuration**: Proper cross-origin resource sharing
6. **Environment Variables**: Sensitive data not hardcoded

## Support

For API support or questions:
1. Check this documentation
2. Review the main README.md
3. Create an issue in the GitHub repository
4. Contact the development team

---

*This API documentation is version 1.0 and is subject to updates. Please check for the latest version in the repository.*