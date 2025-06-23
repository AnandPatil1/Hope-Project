import React, { createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

import Home from "./pages/Home";
import Chatbox from "./pages/Chatbox";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import SideMenu from "./components/SideMenu";
import LandingPage from "./pages/LandingPage";
import EditAccount from "./pages/EditAccount";

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
