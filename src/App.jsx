import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

import Home from "./pages/Home";
import Chatbox from "./pages/Chatbox";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";
import About from "./pages/About";
import SideMenu from "./components/SideMenu";
import LandingPage from "./pages/LandingPage";
import EditAccount from "./pages/EditAccount";

import "./App.css";

export const MenuContext = createContext();
export const ThemeContext = createContext();

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [theme, setTheme] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Apply theme to document body and html
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.backgroundColor = theme === 'light' ? '#f5f5f5' : '#1a1a1a';
  }, [theme]);

  return (
    <Router>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <MenuContext.Provider value={{ toggleMenu }}>
          <SignedOut>
            <LandingPage />
          </SignedOut>
          <SignedIn>
            <SideMenu isOpen={isMenuOpen} closeMenu={closeMenu} />
            <div className="app">
              <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/chat" element={<Chatbox />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/about" element={<About />} />
                <Route path="/account" element={<EditAccount />} />
              </Routes>
            </div>
          </SignedIn>
        </MenuContext.Provider>
      </ThemeContext.Provider>
    </Router>
  );
}

export default App;
