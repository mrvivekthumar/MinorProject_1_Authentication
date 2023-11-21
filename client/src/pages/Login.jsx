import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class=" flex-r container">
      <div class="flex-r login-wrapper">
        <div class="login-text">
          <h3>Log in</h3>
          <p>Mastering The Art Of Event </p>

          <form class="flex-c" onSubmit={loginUser}>
            <div class="input-box">
              <span class="label">E-mail</span>
              <div class=" flex-r input">
                <input
                  type="email"
                  placeholder="name@abc.com"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
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
              </div>
            </div>

            <div class="check">
              <input type="checkbox" name="" id="" />
              <span>I've read and agree with T&C</span>
            </div>

            <input class="btn" type="submit" value="Create an Account" />
            <span class="extra-line"></span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
