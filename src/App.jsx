import React, { createContext } from "react";
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

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Router>
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
              <Route path="/resources/:resourceId" element={<ResourceDetail />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
              <Route path="/account" element={<EditAccount />} />
            </Routes>
          </div>
        </SignedIn>
      </MenuContext.Provider>
    </Router>
  );
}

export default App;
