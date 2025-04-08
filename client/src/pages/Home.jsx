import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Home() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(true);
  const toastShown = useRef(false);

  useEffect(() => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    if (!user && !toastShown.current) {
      toastShown.current = true; // Mark toast as shown
      toast.error("User is not registered with their credentials");
      setAuthorized(false);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, [navigate]);

  if (!authorized) {
    // Do not render Home content if not authorized
    return null;
  }

  return (
    <div className="home-container">
      <h1>Welcome to the Home Page!</h1>
    </div>
  );
}

export default Home;
