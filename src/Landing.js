import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();
  return (
    <div className="landing">

      {/* 🔝 Navbar */}
      <div className="navbar">
        <h3>🚀 AI Interview</h3>
        
      </div>

      {/* 🎯 Hero Section */}
      <div className="hero">
        <span className="badge">New 🚀 AI Interview Coach</span>

        <h1>
          Practice interviews with <br /> AI intelligence
        </h1>

        <p>
          Train, improve, and crack interviews with real AI feedback.
        </p>

        <div className="buttons">
          <button 
  className="primary"
  onClick={() => navigate("/interview")}
>
  Start Interview
</button>
          
          
        </div>
      </div>

      {/* 🌈 Bottom Glow */}
      <div className="glow"></div>

    </div>
  );
}

export default Landing;