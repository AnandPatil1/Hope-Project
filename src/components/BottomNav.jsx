import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./BottomNav.css";

const BottomNav = () => {
  const location = useLocation();

  // Hide BottomNav on chat page
  if (location.pathname === '/chat') {
    return null;
  }

  return (
    <nav className="bottom-nav">
      <Link to="/home">
        <img src="/assets/home.png" alt="Home" />
      </Link>
      <Link to="/chat">
        <img src="/assets/chatbot.png" alt="Chatbot" />
      </Link>
      <Link to="/resources">
        <img src="/assets/resources.png" alt="Resources" />
      </Link>
      <Link to="/settings">
        <img src="/assets/profile.png" alt="Settings" />
      </Link>
    </nav>
  );
};

export default BottomNav;
