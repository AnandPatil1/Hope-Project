import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

import Home from "./pages/HomePage/Home";
import Chatbox from "./pages/ChatBotPage/Chatbox";
import Resources from "./pages/ResourcesPage/Resources";
import ResourceDetail from "./pages/ResourcesPage/ResourceCards/ResourceDetail";
import Settings from "./pages/SettingsPage/Settings";
import About from "./pages/SettingsPage/About/About";
import PrivacyPolicy from "./pages/SettingsPage/PrivacyPolicy/PrivacyPolicy";
import TermsOfUse from "./pages/SettingsPage/Terms of Use/TermsOfUse";
import SideMenu from "./components/Navigation/SideMenu/SideMenu";
import LandingPage from "./pages/LandingPage/LandingPage";
import EditAccount from "./pages/SettingsPage/EditAccount/EditAccount";

import "./App.css";

export const MenuContext = createContext();
export const ChatContext = createContext();

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [chatHistory, setChatHistory] = useState({});
  const [theme, setTheme] = useState(() => {
    // Initialize theme from localStorage on app startup
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light';
      // Apply the theme immediately
      document.body.classList.toggle('dark', savedTheme === 'dark');
      return savedTheme;
    }
    return 'light';
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.body.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  const openTeacherChat = (teacher) => {
    setCurrentTeacher(teacher);
    // Initialize chat history for this teacher if it doesn't exist
    if (!chatHistory[teacher.id]) {
      setChatHistory(prev => ({
        ...prev,
        [teacher.id]: []
      }));
    }
  };

  const openGeneralChat = () => {
    setCurrentTeacher(null);
    // Initialize general chat history if it doesn't exist
    if (!chatHistory['general']) {
      setChatHistory(prev => ({
        ...prev,
        general: []
      }));
    }
  };

  const addMessageToHistory = (teacherId, message) => {
    const chatKey = teacherId || 'general';
    setChatHistory(prev => ({
      ...prev,
      [chatKey]: [...(prev[chatKey] || []), message]
    }));
  };

  // Ensure theme is applied on mount
  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <Router>
      <MenuContext.Provider value={{ toggleMenu, theme, setTheme: handleThemeChange }}>
        <ChatContext.Provider value={{ 
          currentTeacher, 
          openTeacherChat, 
          openGeneralChat, 
          chatHistory, 
          addMessageToHistory 
        }}>
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
                <Route path="/resources/:resourceId" element={<ResourceDetail />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-use" element={<TermsOfUse />} />
                <Route path="/account" element={<EditAccount />} />
              </Routes>
            </div>
          </SignedIn>
        </ChatContext.Provider>
      </MenuContext.Provider>
    </Router>
  );
}

export default App;
