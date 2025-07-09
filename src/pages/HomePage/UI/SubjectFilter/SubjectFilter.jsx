import React from "react";
import "./SubjectFilter.css";

const subjects = ["Physics", "Math", "Computer Science"];

const SubjectFilter = ({ selectedSubject, setSelectedSubject }) => {
  return (
    <div className="subject-filter">
      {subjects.map((subject, idx) => (
        <button
          key={idx}
          className={`chip ${selectedSubject === subject ? "chip-selected" : ""}`}
          onClick={() => setSelectedSubject(subject)}
        >
          {subject}
        </button>
      ))}
    </div>
  );
};

export default SubjectFilter;
