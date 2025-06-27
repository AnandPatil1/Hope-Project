import React, { useState } from "react";
import Header from "../../components/Navigation/Header/Header";
import SubjectFilter from "./UI/SubjectFilter/SubjectFilter";
import ChartCard from "./UI/DashboardChart/ChartCard";
import TeacherList from "./UI/TeacherList/TeacherList";
import BottomNav from "../../components/Navigation/BottomNav/BottomNav";

const Home = () => {
  const [selectedSubject, setSelectedSubject] = useState("Physics");

  return (
    <React.Fragment>
      <Header />
      <SubjectFilter 
        selectedSubject={selectedSubject} 
        setSelectedSubject={setSelectedSubject} 
      />
      <ChartCard selectedSubject={selectedSubject} />
      <TeacherList />
      <BottomNav />
    </React.Fragment>
  );
};

export default Home; 