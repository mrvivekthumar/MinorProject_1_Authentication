import React, { useState, useEffect, createContext, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthGuard from "./component/AuthGuard";
import axios from "axios";
import { Toaster } from "react-hot-toast";

// Set global axios defaults
axios.defaults.baseURL = process.env.NODE_ENV === 'production'
  ? "https://minor-project-1-authentication-mc3v.vercel.app"  // Deployed backend
  : "http://localhost:8000";
axios.defaults.withCredentials = true;


console.log('🔍 Frontend Environment:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('API Base URL:', axios.defaults.baseURL);
console.log('Is Production:', process.env.NODE_ENV === 'production');

// Create a context for authentication state
export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get user information from localStorage
  const getUserFromStorage = useCallback(() => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) return null;
      return JSON.parse(userData);
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user"); // Clear invalid data
      return null;
    }
  }, []);

  // Login handler for context
  const login = useCallback((userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }, []);

  // Logout handler for context
  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  // Check authentication status on component mount
  useEffect(() => {
    const storedUser = getUserFromStorage();
    setUser(storedUser);
    setLoading(false);
  }, [getUserFromStorage]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 5000 }} />
      <Routes>
        <Route
          path="/home"
          element={
            <AuthGuard isAuth={!!user} redirectPath="/login">
              <Home />
            </AuthGuard>
          }
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/home" replace />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/home" replace />}
        />
        {/* Redirect root to appropriate route */}
        <Route
          path="/"
          element={<Navigate to={user ? "/home" : "/login"} replace />}
        />
        {/* Catch all route for 404 */}
        <Route
          path="*"
          element={
            <div className="home-container">
              <div className="home-box">
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
              </div>
            </div>
          }
        />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;