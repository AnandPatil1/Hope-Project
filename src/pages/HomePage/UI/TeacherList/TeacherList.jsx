import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../../../App";
import "./TeacherList.css";

const teachers = [
  { 
    id: "teacher-physics", 
    name: "Prof. Physics", 
    subject: "Physics"
  },
  { 
    id: "teacher-mathematics", 
    name: "Prof. Mathematics", 
    subject: "Mathematics"
  },
  { 
    id: "teacher-computer-science", 
    name: "Prof. Computer Science", 
    subject: "Computer Science"
  },
  { 
    id: "teacher-chemistry", 
    name: "Prof. Chemistry", 
    subject: "Chemistry"
  },
  { 
    id: "teacher-biology", 
    name: "Prof. Biology", 
    subject: "Biology"
  },
];

const TeacherList = () => {
  const { openTeacherChat, openGeneralChat } = useContext(ChatContext);
  const navigate = useNavigate();

  const handleTeacherClick = (teacher) => {
    openTeacherChat(teacher);
    navigate('/chat');
  };

  const handleAddTeacher = () => {
    openGeneralChat();
    navigate('/chat');
  };

  return (
    <div className="teacher-card">
      <div className="teacher-header">
        <h3>Your Teachers</h3>
        <button 
          className="add-teacher-button" 
          onClick={handleAddTeacher}
          title="Add New Teacher"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
      <ul>
        {teachers.map((teacher) => (
          <li 
            key={teacher.id} 
            className="teacher-item"
            onClick={() => handleTeacherClick(teacher)}
          >
            <div className="teacher-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="teacher-info">
              <strong>{teacher.name}</strong>
              <p>{teacher.subject}</p>
            </div>
            <div className="teacher-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherList;
