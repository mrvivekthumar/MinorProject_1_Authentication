import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./register.css";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Register Successful. Welcome");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class=" flex-r container">
      <div class="flex-r login-wrapper">
        <div class="login-text">
          <h3>Register Yourself</h3>
          <p>Mastering The Art Of Event </p>

          <form class="flex-c" onSubmit={registerUser}>
            <div class="input-box">
              <span class="label">Username</span>
              <div class=" flex-r input">
                <input
                  type="text"
                  placeholder="Username"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                <i class="fas fa-at"></i>
              </div>
            </div>
            <div class="input-box">
              <span class="label">E-mail</span>
              <div class=" flex-r input">
                <input
                  type="email"
                  placeholder="E-mail"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <i class="fas fa-at"></i>
              </div>
            </div>

            <div class="input-box">
              <span class="label">Password</span>
              <div class="flex-r input">
                <input
                  type="password"
                  placeholder="password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
                <i class="fas fa-lock"></i>
              </div>
            </div>
            <span class="extra-line"></span>
            <button className="btn" value="Register" type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
