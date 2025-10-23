# Modern MERN Stack Blog Platform

A full-featured blogging platform built with the MERN stack (MongoDB, Express.js, React, Node.js) that demonstrates modern web development practices and seamless integration between front-end and back-end components.

## ✨ Features

### 🔐 User Authentication & Authorization
- Secure JWT-based authentication system
- Protected routes and API endpoints
- User registration with email validation
- Secure password hashing with bcrypt
- Role-based access control (user/admin)

### 📝 Blog Management
- Create, read, update, and delete blog posts
- Rich text content support
- Featured image uploads with preview
- Category organization
- Draft and publish functionality
- Author attribution

### 💬 Interactive Comments
- Real-time comment updates
- Threaded discussions
- Comment moderation tools
- User avatars integration
- Rich text formatting

### 🎨 Modern UI/UX
- Responsive design for all devices
- Tailwind CSS for modern styling
- Toast notifications for feedback
- Loading states and animations
- Error handling and recovery
- Intuitive navigation

### 🔍 Search & Discovery
- Full-text search functionality
- Category-based filtering
- Pagination for performance
- Sort by date, popularity
- Related posts suggestions

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- MongoDB instance running
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SAIDKUMBO/mern-stack-integration-SAIDKUMBO.git
cd mern-stack-integration-SAIDKUMBO
```

2. Set up the backend:
```bash
cd server
npm install
# Create .env file with your configuration
npm start
```

3. Set up the frontend:
```bash
cd ../client
npm install
npm run dev
```

### Environment Configuration

**Server (.env):**
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

**Client (.env):**
```env
VITE_API_URL=http://localhost:5000/api
```

## 🏗️ Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── context/      # React context (Auth, Theme)
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── styles/       # Global styles and Tailwind
│   ├── vite.config.js    # Vite configuration
```

└── server/                # Backend Express application
    ├── config/           # Configuration files
    ├── controllers/      # Route controllers
    ├── middleware/       # Custom middleware
    ├── models/          # Mongoose models
    ├── routes/          # Express routes
    └── uploads/         # File uploads storage

## 🔌 API Endpoints

### Authentication
```http
POST /api/auth/register   - Register new user
POST /api/auth/login      - Login user
GET  /api/auth/me         - Get current user
```

### Posts
```http
GET    /api/posts         - Get all posts
GET    /api/posts/:id     - Get single post
POST   /api/posts         - Create new post
PUT    /api/posts/:id     - Update post
DELETE /api/posts/:id     - Delete post
```

### Comments
```http
GET    /api/posts/:id/comments     - Get post comments
POST   /api/posts/:id/comments     - Add comment
DELETE /api/posts/:id/comments/:id - Delete comment
```

### Categories
```http
GET    /api/categories           - Get all categories
POST   /api/categories          - Create category
PUT    /api/categories/:id      - Update category
DELETE /api/categories/:id      - Delete category
```

## 👤 Author

**Said Kumbo**
- GitHub: [@SAIDKUMBO](https://github.com/SAIDKUMBO)

## 🙏 Acknowledgments

- MERN stack community
- Open source contributors
- Documentation writers
- Beta testers
```
│
└── server/                # Backend Node.js application
    ├── config/           # App configuration
    ├── controllers/      # Route controllers
    ├── middleware/       # Custom middleware
    ├── models/          # Mongoose models
    ├── routes/          # API routes
    └── uploads/         # Uploaded files
  - Basic project structure
  - Configuration files
  - Sample models and components

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn
- Git

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete both the client and server portions of the application
2. Implement all required API endpoints
3. Create the necessary React components and hooks
4. Document your API and setup process in the README.md
5. Include screenshots of your working application

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/) 