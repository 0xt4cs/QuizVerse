# QuizVerse Deployment Guide

This guide covers various deployment options for QuizVerse application.

## Prerequisites

- Docker and Docker Compose installed
- MongoDB instance (local or cloud)
- Google OAuth credentials
- SSL certificates (for production)

## Environment Setup

### 1. Backend Environment Variables

Create `.env` file in the `backend` directory:

```bash
# Database
MONGO_URI=mongodb://your-mongo-connection-string
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Server
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

### 2. Frontend Environment Variables

Create `.env.production` file in the `frontend` directory:

```bash
# API Configuration
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_NODE_ENV=production
```

## Deployment Options

### Option 1: Docker Compose (Recommended)

1. **Configure environment variables**:
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env.production
   # Edit both files with your values
   ```

2. **Build and run services**:
   ```bash
   docker-compose up -d
   ```

3. **Verify deployment**:
   ```bash
   # Check service status
   docker-compose ps
   
   # Check backend health
   curl http://localhost:5000/health
   
   # Access application
   open http://localhost:3000
   ```

### Option 2: Individual Docker Containers

1. **Build backend image**:
   ```bash
   cd backend
   docker build -t quizverse-backend .
   ```

2. **Build frontend image**:
   ```bash
   cd frontend
   docker build -t quizverse-frontend .
   ```

3. **Run MongoDB**:
   ```bash
   docker run -d --name mongodb \
     -p 27017:27017 \
     -e MONGO_INITDB_ROOT_USERNAME=admin \
     -e MONGO_INITDB_ROOT_PASSWORD=password \
     mongo:7.0
   ```

4. **Run backend**:
   ```bash
   docker run -d --name quizverse-backend \
     -p 5000:5000 \
     --env-file backend/.env \
     --link mongodb:mongodb \
     quizverse-backend
   ```

5. **Run frontend**:
   ```bash
   docker run -d --name quizverse-frontend \
     -p 3000:80 \
     --link quizverse-backend:api \
     quizverse-frontend
   ```

### Option 3: Cloud Deployment (AWS/GCP/Azure)

#### AWS Deployment with ECS

1. **Push images to ECR**:
   ```bash
   # Login to ECR
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <aws-account-id>.dkr.ecr.us-east-1.amazonaws.com
   
   # Tag and push backend
   docker tag quizverse-backend:latest <aws-account-id>.dkr.ecr.us-east-1.amazonaws.com/quizverse-backend:latest
   docker push <aws-account-id>.dkr.ecr.us-east-1.amazonaws.com/quizverse-backend:latest
   
   # Tag and push frontend
   docker tag quizverse-frontend:latest <aws-account-id>.dkr.ecr.us-east-1.amazonaws.com/quizverse-frontend:latest
   docker push <aws-account-id>.dkr.ecr.us-east-1.amazonaws.com/quizverse-frontend:latest
   ```

2. **Create ECS task definition**:
   ```json
   {
     "family": "quizverse-task",
     "networkMode": "awsvpc",
     "requiresCompatibilities": ["FARGATE"],
     "cpu": "512",
     "memory": "1024",
     "containerDefinitions": [
       {
         "name": "backend",
         "image": "<aws-account-id>.dkr.ecr.us-east-1.amazonaws.com/quizverse-backend:latest",
         "portMappings": [
           {
             "containerPort": 5000,
             "protocol": "tcp"
           }
         ],
         "environment": [
           {
             "name": "NODE_ENV",
             "value": "production"
           }
         ]
       },
       {
         "name": "frontend",
         "image": "<aws-account-id>.dkr.ecr.us-east-1.amazonaws.com/quizverse-frontend:latest",
         "portMappings": [
           {
             "containerPort": 80,
             "protocol": "tcp"
           }
         ]
       }
     ]
   }
   ```

3. **Deploy using ECS**:
   ```bash
   aws ecs create-service \
     --cluster quizverse-cluster \
     --service-name quizverse-service \
     --task-definition quizverse-task \
     --desired-count 2 \
     --launch-type FARGATE \
     --network-configuration "awsvpcConfiguration={subnets=[subnet-12345],securityGroups=[sg-12345],assignPublicIp=ENABLED}"
   ```

### Option 4: Kubernetes Deployment

1. **Create namespace**:
   ```bash
   kubectl create namespace quizverse
   ```

2. **Deploy MongoDB**:
   ```yaml
   # mongodb-deployment.yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: mongodb
     namespace: quizverse
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: mongodb
     template:
       metadata:
         labels:
           app: mongodb
       spec:
         containers:
         - name: mongodb
           image: mongo:7.0
           ports:
           - containerPort: 27017
           env:
           - name: MONGO_INITDB_ROOT_USERNAME
             value: admin
           - name: MONGO_INITDB_ROOT_PASSWORD
             value: password
   ```

3. **Deploy backend**:
   ```yaml
   # backend-deployment.yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: quizverse-backend
     namespace: quizverse
   spec:
     replicas: 2
     selector:
       matchLabels:
         app: quizverse-backend
     template:
       metadata:
         labels:
           app: quizverse-backend
       spec:
         containers:
         - name: backend
           image: quizverse-backend:latest
           ports:
           - containerPort: 5000
           env:
           - name: NODE_ENV
             value: production
   ```

4. **Deploy frontend**:
   ```yaml
   # frontend-deployment.yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: quizverse-frontend
     namespace: quizverse
   spec:
     replicas: 2
     selector:
       matchLabels:
         app: quizverse-frontend
     template:
       metadata:
         labels:
           app: quizverse-frontend
       spec:
         containers:
         - name: frontend
           image: quizverse-frontend:latest
           ports:
           - containerPort: 80
   ```

5. **Apply configurations**:
   ```bash
   kubectl apply -f mongodb-deployment.yaml
   kubectl apply -f backend-deployment.yaml
   kubectl apply -f frontend-deployment.yaml
   ```

## Production Checklist

### Security
- [ ] Strong JWT secret (minimum 32 characters)
- [ ] HTTPS enabled with valid SSL certificates
- [ ] Environment variables properly secured
- [ ] Database connection secured
- [ ] Rate limiting configured appropriately
- [ ] Security headers enabled
- [ ] CORS properly configured

### Performance
- [ ] Database indexes created
- [ ] Caching strategy implemented
- [ ] CDN configured for static assets
- [ ] Image optimization
- [ ] Bundle size optimization
- [ ] Database connection pooling

### Monitoring
- [ ] Health checks configured
- [ ] Logging system in place
- [ ] Error tracking (Sentry, Rollbar)
- [ ] Performance monitoring (New Relic, Datadog)
- [ ] Uptime monitoring
- [ ] Database monitoring

### Backup & Recovery
- [ ] Database backup strategy
- [ ] Automated backups configured
- [ ] Disaster recovery plan
- [ ] Data retention policy
- [ ] Recovery testing

### Scaling
- [ ] Load balancer configured
- [ ] Auto-scaling policies
- [ ] Database scaling strategy
- [ ] CDN for global distribution
- [ ] Container orchestration

## Troubleshooting

### Common Issues

1. **Database connection failed**:
   - Check MongoDB connection string
   - Verify network connectivity
   - Check firewall rules

2. **Google OAuth not working**:
   - Verify OAuth credentials
   - Check authorized domains
   - Ensure HTTPS in production

3. **CORS errors**:
   - Check FRONTEND_URL in backend .env
   - Verify origins in CORS configuration
   - Ensure proper headers

4. **Build failures**:
   - Check environment variables
   - Verify all dependencies installed
   - Check Docker daemon status

### Monitoring Commands

```bash
# Check application health
curl http://localhost:5000/health

# Check Docker containers
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Check resource usage
docker stats

# Database connectivity test
docker exec -it mongodb mongo --eval "db.adminCommand('ping')"
```

## Maintenance

### Regular Tasks
1. **Update dependencies** (monthly)
2. **Security patches** (as needed)
3. **Database maintenance** (weekly)
4. **Log rotation** (daily)
5. **Backup verification** (weekly)
6. **Performance monitoring** (daily)

### Monitoring Alerts
- High error rate
- Database connection failures
- High response times
- Memory/CPU usage spikes
- Disk space warnings

For additional support, refer to the main README.md file or create an issue in the repository.