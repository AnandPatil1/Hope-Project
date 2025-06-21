import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuContext } from '../App';
import './Chatbox.css';

const Chatbox = () => {
  const navigate = useNavigate();
  const { toggleMenu } = useContext(MenuContext);

  return (
    <div className="app">
      <div className="chatbox-header">
        <button className="back-button" onClick={toggleMenu}>☰</button>
        <img src="/assets/profile.png" alt="avatar" className="avatar" />
        <div className="header-info">
          <p className="header-name">Helena Hills</p>
          <p className="header-course">AP Physics 1: Mechanics</p>
        </div>
      </div>
      <div className="messages">
        {/* Messages will be dynamically rendered here */}
        <div className="message-container received">
            <div className="message received">Oh?</div>
            <div className="message received">Cool</div>
            <div className="message received">How does it work?</div>
        </div>

        <div className="message-container sent">
            <div className="message sent">this is how you can communicate with the Ai Teacher</div>
            <div className="message-timestamp">Nov 30, 2023, 9:41 AM</div>
        </div>

        <div className="message-container received">
            <div className="message received">
                You just text any question or comment relating to the course and the AI will look through the uploaded Documents/ Resources and answer your question.
            </div>
        </div>

        <div className="message-container sent">
            <div className="message sent">Boom!</div>
        </div>

        <div className="message-container received">
            <div className="message received">Hmmm</div>
            <div className="message received">I think I get it</div>
            <div className="message received">I can see here that I can also upload more documents or a picture if that would help me better.</div>
        </div>

      </div>
      <div className="chatbox-input">
        <input type="text" placeholder="Message..." />
        <button className="gallery-button">🖼️</button>
        <button className="attach-button">📎</button>
      </div>
    </div>
  );
};

export default Chatbox; 