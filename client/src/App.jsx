import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import axios from "axios";
import { Toaster } from "react-hot-toast";

// Set global axios defaults
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  const isLoggedIn = !!localStorage.getItem("user");

  return (
    <>
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 5000 }} />
      <Routes>
        {/* Always render Home so that its useEffect can show toast and then redirect if not logged in */}
        <Route path="/home" element={<Home />} />
        <Route
          path="/register"
          element={!isLoggedIn ? <Register /> : <Navigate to="/home" replace />}
        />
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/home" replace />}
        />
        {/* Redirect root to appropriate route */}
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />}
        />
      </Routes>
    </>
  );
}

export default App;
