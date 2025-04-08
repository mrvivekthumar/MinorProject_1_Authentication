import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../App";
import "../pages/styles/Navbar.module.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to={user ? "/home" : "/"} className="brand-link">
          <span className="brand-icon">🔐</span>
          <span className="brand-text">AuthApp</span>
        </Link>
      </div>

      <div className="nav-links">
        {user ? (
          <>
            <div className="user-info">
              <span className="user-avatar">👤</span>
              <span className="user-name">{user.name || user.email}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <span className="logout-icon">🚪</span>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="nav-link register-link" to="/register">
              Register
            </Link>
            <Link className="nav-link login-link" to="/login">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}