import React, { useState, useContext } from "react";
import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { MenuContext } from "../../App";
import SubjectFilter from "./UI/SubjectFilter/SubjectFilter";
import ChartCard from "./UI/DashboardChart/ChartCard";
import TeacherList from "./UI/TeacherList/TeacherList";
import BottomNav from "../../components/Navigation/BottomNav/BottomNav";
import "../../styles/shared.css";

const Home = () => {
  const [selectedSubject, setSelectedSubject] = useState("Physics");
  const { toggleMenu } = useContext(MenuContext);
  const { user } = useClerk();
  const navigate = useNavigate();
  
  // Get first name from user's full name
  const firstName = user?.firstName || user?.fullName?.split(' ')[0] || 'User';

  return (
    <div className="page-container home-page">
      <header className="page-header home-header">
        <button onClick={toggleMenu} className="menu-button">☰</button>
        <div className="header-info">
          <p className="header-name">Hello {firstName}!</p>
          <p className="header-description">What subject do you need help with?</p>
        </div>
        <img 
            src={user?.imageUrl || "/assets/profile.png"} 
            alt="Profile" 
            className="profile-pic" 
            onClick={() => navigate('/account')}
            style={{ cursor: 'pointer' }}
        />
      </header>
      <div className="page-content home-content">
        <SubjectFilter 
          selectedSubject={selectedSubject} 
          setSelectedSubject={setSelectedSubject} 
        />
        <ChartCard selectedSubject={selectedSubject} />
        <TeacherList />
      </div>
      <BottomNav />
    </div>
  );
};

export default Home; 