# QuizVerse

Hi there! I'm Jushtine Kylle Taculad. Welcome to QuizVerse, a production-ready full-stack quiz application developed with my classmate John Rayvie Mendeja for our System Integration and Architecture 1 course.

QuizVerse is a full-stack web application allowing users to take quizzes on various topics, track their scores, and see how they rank on leaderboards. We aimed to create a functional, secure, and engaging quiz platform demonstrating the integration of frontend and backend technologies.

## 🚀 Features

### Core Features
- **Google OAuth Authentication** - Secure user authentication
- **Multi-difficulty Quizzes** - Easy, Medium, and Hard difficulty levels
- **Score Tracking** - Track your performance across different categories
- **Leaderboards** - See how you rank against other users
- **Responsive Design** - Works on desktop and mobile devices

### Production Features
- **Security** - Rate limiting, input validation, security headers
- **Error Handling** - Comprehensive error boundaries and logging
- **Environment Configuration** - Proper environment variable management
- **API Configuration** - Centralized API endpoint management
- **Health Checks** - Monitor application health
- **Docker Support** - Container-ready deployment
- **Performance Optimization** - Caching and bundle optimization

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Material UI** - Component library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **ESLint** - Code linting and formatting

### Backend
- **Node.js & Express.js** - Server runtime and framework
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - JSON Web Token authentication
- **Google OAuth** - Third-party authentication
- **Helmet** - Security middleware
- **Express Rate Limit** - API rate limiting
- **Express Validator** - Input validation

### DevOps & Production
- **Docker & Docker Compose** - Containerization
- **Nginx** - Web server and reverse proxy
- **Environment Variables** - Configuration management
- **Health Checks** - Application monitoring

## 📁 Project Structure

```
QuizVerse/
├── backend/                # Node.js/Express backend
│   ├── config/            # Database configuration
│   ├── controllers/       # Request handling logic
│   ├── middlewares/       # Custom middleware (auth, validation)
│   ├── models/           # Mongoose models
│   ├── routes/           # API route definitions
│   ├── .env.example      # Environment variables template
│   ├── Dockerfile        # Docker configuration
│   └── server.js         # Server entry point
├── frontend/              # React/Vite frontend
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── config/       # API configuration
│   │   ├── context/      # React Context (AuthContext)
│   │   ├── App.jsx       # Root component
│   │   └── main.jsx      # App entry point
│   ├── .env.example      # Environment variables template
│   ├── Dockerfile        # Docker configuration
│   └── nginx.conf        # Nginx configuration
├── docker-compose.yml    # Multi-container setup
├── README.md            # This file
└── LICENSE              # MIT License
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Google OAuth credentials

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/0xt4cs/QuizVerse.git
   cd QuizVerse
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Copy environment file and configure
   cp .env.example .env
   # Edit .env with your MongoDB URI, JWT secret, and Google OAuth credentials
   
   # Start the backend server
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   
   # Copy environment file and configure
   cp .env.example .env.local
   # Edit .env.local with your API URL and Google OAuth client ID
   
   # Start the development server
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

### Production Deployment with Docker

1. **Configure environment variables**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   # Edit backend/.env with production values
   
   # Frontend
   cp frontend/.env.example frontend/.env.production
   # Edit frontend/.env.production with production values
   ```

2. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Application: http://localhost:3000
   - API: http://localhost:5000
   - Health Check: http://localhost:5000/health

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/quizverse
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

#### Frontend (.env.local)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_NODE_ENV=development
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Use the client ID and secret in your environment variables

## 🧪 Development

### Available Scripts

#### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run serve    # Preview production build
npm run lint     # Run ESLint
npm run lint:fix # Fix ESLint errors
```

#### Backend
```bash
npm start        # Start the server
npm test         # Run tests (to be implemented)
```

### Code Quality
- ESLint configuration for consistent code style
- Error boundaries for React components
- Input validation on all API endpoints
- Security headers and rate limiting
- Comprehensive error handling

## 🔒 Security Features

- **Rate Limiting** - Prevents abuse of API endpoints
- **Input Validation** - Validates all user inputs
- **Security Headers** - Helmet.js for security headers
- **Environment Variables** - Sensitive data not hardcoded
- **JWT Authentication** - Secure token-based auth
- **Error Handling** - Prevents information leakage

## 📊 Monitoring

- **Health Check Endpoint** - `/health` for application monitoring
- **API Status Endpoint** - `/api/status` for API health
- **Comprehensive Logging** - Error and access logging
- **Docker Health Checks** - Container health monitoring

## 🚀 Deployment

### Production Checklist
- [ ] Set strong JWT secret
- [ ] Configure proper MongoDB connection string
- [ ] Set up Google OAuth with production URLs
- [ ] Configure environment variables
- [ ] Set up SSL/TLS certificates
- [ ] Configure proper CORS origins
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy

### Scaling Considerations
- Use a load balancer for multiple backend instances
- Implement Redis for session storage
- Use MongoDB replica sets for high availability
- Set up proper logging and monitoring
- Implement CI/CD pipeline

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Jushtine Kylle Taculad** - [@0xt4cs](https://github.com/0xt4cs)
- **John Rayvie Mendeja** - Contributor

## 🙏 Acknowledgments

- Open Trivia Database for quiz questions
- Google OAuth for authentication
- The React and Node.js communities
- All contributors and testers

---

Made with ❤️ for System Integration and Architecture 1 course 