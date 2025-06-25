import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../App";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useContext(AuthContext);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  const registerUser = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password) {
      toast.error("All fields are required");
      return;
    }

    if (data.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Registration successful!");
        setData({ name: "", email: "", password: "" });
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "An error occurred during registration.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Please fill in your details to register</p>
        </div>

        <form onSubmit={registerUser} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-group">
              <span className="input-icon">👤</span>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-group">
              <span className="input-icon">📧</span>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
                disabled={loading}
                minLength="6"
              />
            </div>
            <small className="password-hint">Password must be at least 6 characters long</small>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <span className="loading-spinner">⏳</span>
            ) : (
              <>
                <span className="btn-icon">🚀</span>
                Create Account
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;