import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="auth-form">
      <h2>Welcome to To-Do App</h2>
      <button onClick={() => navigate("/login")}>Login</button>
      <button
        onClick={() => navigate("/register")}
        style={{ marginLeft: "10px" }}
      >
        Register
      </button>
    </div>
  );
}
