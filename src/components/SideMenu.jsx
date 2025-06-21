import React from 'react';
import { Link } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import './SideMenu.css';

const SideMenu = ({ isOpen, closeMenu }) => {
  const { user } = useClerk();
    
  if (!isOpen) {
    return null;
  }

  return (
    <div className="side-menu-overlay" onClick={closeMenu}>
      <div className="side-menu" onClick={(e) => e.stopPropagation()}>
        <div className="side-menu-header">
          <button onClick={closeMenu} className="close-button">×</button>
          <span className="menu-title">HOPE</span>
        </div>
        <nav className="side-menu-nav">
          <Link to="/home" onClick={closeMenu}><span className="nav-icon">🏠</span> Home</Link>
          <Link to="/chat" onClick={closeMenu}><span className="nav-icon">💬</span> Chat Bot</Link>
          <Link to="/resources" onClick={closeMenu}><span className="nav-icon">📚</span> Resources</Link>
          <a href="#" onClick={closeMenu}><span className="nav-icon">💳</span> Subscription</a>
          <Link to="/settings" onClick={closeMenu}><span className="nav-icon">⚙️</span> Settings</Link>
          <a href="#" onClick={closeMenu}><span className="nav-icon">❓</span> Help & Feedback</a>
        </nav>
        <Link to="/account" className="side-menu-footer" onClick={closeMenu}>
            <img src={user.imageUrl} alt="Your profile image" className="user-avatar" />
            <span className="user-button-label">Manage Account</span>
        </Link>
      </div>
    </div>
  );
};

export default SideMenu; 