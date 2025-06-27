import React from "react";
import "./TeacherList.css";

const teachers = [
  { name: "Teacher A", email: "a@example.com", img: "profile.png" },
  { name: "Teacher B", email: "b@example.com", img: "profile.png" },
  { name: "Teacher C", email: "c@example.com", img: "profile.png" },
  { name: "Teacher D", email: "d@example.com", img: "profile.png" },
  { name: "Teacher E", email: "e@example.com", img: "profile.png" },
];

const TeacherList = () => {
  return (
    <div className="teacher-card">
      <h3>Your Teachers</h3>
      <ul>
        {teachers.map((teacher, index) => (
          <li key={index}>
            <img src={`/assets/${teacher.img}`} alt={teacher.name} />
            <div>
              <strong>{teacher.name}</strong>
              <p>{teacher.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherList;
