import React, { useContext } from 'react';
import { MenuContext } from '../App';
import './Header.css';

const Header = () => {
  const { toggleMenu } = useContext(MenuContext);
  return (
    <header className="header">
      <button onClick={toggleMenu} className="menu-button">☰</button>
      <div className="user-info">
        <p>Hello Helena!</p>
        <span>What subject do you need help with?</span>
      </div>
      <img src="/assets/search.png" alt="Search" className="search-icon" />
    </header>
  );
};

export default Header;
