# 🔐 Authentication

A secure and scalable user authentication system built using the **MERN stack**. This project provides comprehensive user management with registration, login, session handling, and role-based access control through an elegant frontend and a robust backend API.

![GitHub stars](https://img.shields.io/github/stars/yourusername/authentication?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/authentication?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/authentication?style=social)
![License](https://img.shields.io/badge/license-MIT-blue)

## 📸 Screenshots

### 🏠 Home / Landing Page
![Home](screenshots/home.png)

### 🔑 Login Page
![Login](screenshots/login.png)

### 🧾 Register Page
![Register](screenshots/register.png)

### ✅ Dashboard
![Dashboard](screenshots/dashboard.png)

## 📝 Description

This application delivers a complete full-stack implementation of user authentication using React for the frontend and Node.js/Express with MongoDB on the backend. It features secure login and registration flows, protected route handling with JSON Web Tokens (JWT), and password encryption. The frontend utilizes custom CSS styling to ensure a responsive, intuitive, and visually appealing user interface across all devices.

## 🛠️ Tech Stack

| Frontend | Backend | Database | Security | Tools |
|----------|---------|----------|----------|-------|
| React    | Node.js | MongoDB  | JWT      | Vite  |
| Vite     | Express |          | bcrypt   | Dotenv |
| CSS      |         |          |          | Postman |

## 🌟 Features

- ✅ User registration with email verification
- ✅ Secure login with JWT authentication
- ✅ Comprehensive form validation with real-time feedback
- ✅ Password encryption using bcrypt
- ✅ Protected API routes and frontend pages
- ✅ Intelligent redirects based on authentication status
- ✅ Role-based access control (admin, user)
- ✅ Responsive design with custom CSS
- ✅ Session persistence

## 📁 Project Structure

```
authentication/
├── client/                  # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/          # Images, icons, etc.
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Main application pages
│   │   ├── context/         # React context providers
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Helper functions
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                  # Node.js + Express Backend
│   ├── controllers/         # Route controllers
│   ├── helpers/             # Utility functions
│   ├── middleware/          # Express middleware
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API route definitions
│   ├── config/              # Configuration files
│   ├── index.js             # Server entry point
│   └── package.json
│
├── screenshots/             # README screenshots
│   ├── home.png
│   ├── login.png
│   ├── register.png
│   └── dashboard.png
│
├── .gitignore
├── README.md
└── LICENSE
```

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/authentication.git
cd authentication

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### Environment Configuration

Create a `.env` file in the `/server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=7d
NODE_ENV=development
```

### Running the Application

```bash
# Start the backend server (from /server directory)
npm run dev

# Start the frontend application (from /client directory)
npm run dev
```

Access the application at: http://localhost:5173

## 🧪 Testing

```bash
# Run backend tests
cd server
npm test

# Run frontend tests
cd client
npm test
```

## 📝 API Documentation

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|--------------|
| `/api/auth/register` | POST | Register a new user | No |
| `/api/auth/login` | POST | Authenticate user | No |
| `/api/auth/verify` | GET | Verify JWT token | Yes |
| `/api/users/profile` | GET | Get user profile | Yes |
| `/api/users/profile` | PUT | Update user profile | Yes |

## 🚀 Deployment

### Frontend Deployment
The React frontend can be deployed to services like Vercel, Netlify, or GitHub Pages.

```bash
cd client
npm run build
```

### Backend Deployment
The Node.js backend can be deployed to services like Heroku, Railway, or DigitalOcean.

```bash
cd server
npm run build
```

## 🤝 Contributing

Contributions are always welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and adhere to the existing coding style.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter) - email@example.com

Project Link: [https://github.com/yourusername/authentication](https://github.com/yourusername/authentication)

---

Made with ❤️ by [Your Name](https://github.com/yourusername)