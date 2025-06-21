import React, { useState } from "react";
import Header from "../components/Header";
import SubjectFilter from "../components/SubjectFilter";
import ChartCard from "../components/ChartCard";
import TeacherList from "../components/TeacherList";
import BottomNav from "../components/BottomNav";

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