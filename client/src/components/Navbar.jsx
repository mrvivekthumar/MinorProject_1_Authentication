import React from "react";
import { Link } from "react-router-dom";
import "./Nabar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link
        className="link"
        to="http://127.0.0.1:5500/Front-End/Navigation.html"
      >
        Home
      </Link>
      <Link className="link" to="/register">
        Register
      </Link>
      <Link className="link" to="/login">
        Login
      </Link>
    </nav>
  );
}
