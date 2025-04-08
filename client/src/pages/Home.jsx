import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // If not logged in, don't render anything
  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="welcome-section">
          <div className="user-avatar">👤</div>
          <h1>Welcome back, {user.name || "User"}!</h1>
          <p className="welcome-message">You've successfully logged into your account.</p>
        </div>

        <div className="info-cards">
          <div className="info-card">
            <div className="card-icon">🔒</div>
            <h3>Secure Account</h3>
            <p>Your account is protected with industry-standard security measures.</p>
          </div>

          <div className="info-card">
            <div className="card-icon">⚡</div>
            <h3>Fast Access</h3>
            <p>Quick and easy access to all your account features.</p>
          </div>

          <div className="info-card">
            <div className="card-icon">🎯</div>
            <h3>Personalized</h3>
            <p>Your experience is tailored to your preferences.</p>
          </div>
        </div>

        <div className="account-info">
          <h2>Account Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Account Type</span>
              <span className="info-value">Standard</span>
            </div>
            <div className="info-item">
              <span className="info-label">Status</span>
              <span className="info-value status-active">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;