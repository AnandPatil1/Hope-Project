import React, { useContext } from 'react';
import { MenuContext } from '../../../App';
import './Header.css';
import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { toggleMenu } = useContext(MenuContext);
  const { user } = useClerk();
  const navigate = useNavigate();
  
  // Get first name from user's full name
  const firstName = user?.firstName || user?.fullName?.split(' ')[0] || 'User';
  
  return (
    <header className="header">
      <button onClick={toggleMenu} className="menu-button">☰</button>
      <div className="user-info">
        <p>Hello {firstName}!</p>
        <span>What subject do you need help with?</span>
      </div>
      <img 
          src={user?.imageUrl || "/assets/profile.png"} 
          alt="Profile" 
          className="profile-pic" 
          onClick={() => navigate('/account')}
          style={{ cursor: 'pointer' }}
      />
    </header>
  );
};

export default Header;
