import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const response = await axios.post("/register", { name, email, password });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Registration successful!");
        localStorage.setItem("user", JSON.stringify(response.data));
        setData({ name: "", email: "", password: "" });
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during registration.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>
        <form onSubmit={registerUser}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={data.name}
            onChange={(e) =>
              setData({ ...data, name: e.target.value })
            }
            required
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={data.email}
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={data.password}
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
