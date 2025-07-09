import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuContext, ChatContext } from '../../App';
import { useClerk } from '@clerk/clerk-react';
import './Chatbox.css';

const Chatbox = () => {
  const navigate = useNavigate();
  const { toggleMenu } = useContext(MenuContext);
  const { currentTeacher, chatHistory, addMessageToHistory } = useContext(ChatContext);
  const { user } = useClerk();
  
  // Get the current chat key (teacher ID or 'general')
  const currentChatKey = currentTeacher?.id || 'general';
  const currentChatHistory = chatHistory[currentChatKey] || [];
  
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Update messages when chat history changes
  useEffect(() => {
    setMessages(currentChatHistory);
  }, [currentChatKey]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTimestamp = (date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const shouldShowTimestamp = (currentMessage, previousMessage) => {
    if (!previousMessage) return true;
    
    const timeDiff = Math.abs(currentMessage.timestamp - previousMessage.timestamp);
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
    
    return timeDiff > fiveMinutes;
  };

  // Function to format text with asterisk markdown (*, **, ***)
  const formatMessageContent = (content) => {
    if (!content) return content;
    
    // Split the content by asterisk patterns and format accordingly
    const parts = [];
    let lastIndex = 0;
    
    // Regex to match asterisk patterns: ***text***, **text**, *text*
    const asteriskRegex = /(\*{1,3})(.*?)\1/g;
    let match;
    
    while ((match = asteriskRegex.exec(content)) !== null) {
      // Add any text before the match
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }
      
      const asteriskCount = match[1].length;
      const text = match[2];
      
      // Format based on number of asterisks
      if (asteriskCount === 1) {
        // *text* -> italic
        parts.push(<em key={match.index}>{text}</em>);
      } else if (asteriskCount === 2) {
        // **text** -> bold
        parts.push(<strong key={match.index}>{text}</strong>);
      } else if (asteriskCount === 3) {
        // ***text*** -> bold italic
        parts.push(<strong key={match.index}><em>{text}</em></strong>);
      }
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add any remaining text after the last match
    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }
    
    return parts.length > 0 ? parts : content;
  };

  // Gemini API integration (for prototyping only; do NOT expose your API key in production!)
  // The API key is now loaded from .env.local using Vite's environment variable system
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  async function fetchGeminiResponse(userMessage) {
    try {
      console.log('Calling Gemini API with message:', userMessage);
      console.log('API URL:', GEMINI_API_URL);
      
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }]
        })
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        return `API Error: ${response.status} - ${errorText}`;
      }
      
      const data = await response.json();
      console.log('API Response data:', data);
      
      const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log('Extracted AI response:', aiResponse);
      
      return aiResponse || "Sorry, I couldn't understand that.";
    } catch (error) {
      console.error('Fetch error:', error);
      return `Error: ${error.message}`;
    }
  }

  const simulateAIResponse = async (userMessage) => {
    setIsTyping(true);
    const response = await fetchGeminiResponse(userMessage);
    setIsTyping(false);
    return response;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'sent',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    // Add to local state and global chat history
    setMessages(prev => [...prev, userMessage]);
    addMessageToHistory(currentTeacher?.id, userMessage);
    setInputMessage('');

    // Get AI response
    const aiResponse = await simulateAIResponse(userMessage.content);
    
    const aiMessage = {
      id: Date.now() + 1,
      type: 'received',
      content: aiResponse,
      timestamp: new Date()
    };

    // Add to local state and global chat history
    setMessages(prev => [...prev, aiMessage]);
    addMessageToHistory(currentTeacher?.id, aiMessage);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = () => {
    // TODO: Implement file upload functionality
    alert('File upload functionality coming soon!');
  };

  const handleImageUpload = () => {
    // TODO: Implement image upload functionality
    alert('Image upload functionality coming soon!');
  };

  // Get header info based on current teacher
  const getHeaderInfo = () => {
    if (currentTeacher) {
      return {
        name: currentTeacher.name,
        course: currentTeacher.subject
      };
    } else {
      return {
        name: "The AI Learning Assistant",
        course: "General Help"
      };
    }
  };

  const headerInfo = getHeaderInfo();

  return (
    <div className="app">
      <div className="chatbox-header">
        <button className="back-button" onClick={() => navigate('/home')}>‹</button>
        <div className="header-info">
          <p className="header-name">{headerInfo.name}</p>
          <p className="header-course">{headerInfo.course}</p>
        </div>
        <img 
            src={user?.imageUrl || "/assets/profile.png"} 
            alt="avatar" 
            className="avatar" 
            onClick={() => navigate('/account')}
            style={{ cursor: 'pointer' }}
        />
      </div>
      
      <div className="messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            <p>Hello! I am {headerInfo.name}.</p>
            <p>Ask me anything about {headerInfo.course.toLowerCase()} or any other subject you need help with.</p>
          </div>
        )}
        
        {messages.map((message, index) => {
          const showTimestamp = shouldShowTimestamp(message, messages[index - 1]);
          
          return (
            <React.Fragment key={message.id}>
              {showTimestamp && (
                <div className="timestamp-divider">
                  <span className="timestamp-text">{formatTimestamp(message.timestamp)}</span>
                </div>
              )}
              <div className={`message-container ${message.type}`}>
                <div className={`message ${message.type}`}>
                  {formatMessageContent(message.content)}
                </div>
              </div>
            </React.Fragment>
          );
        })}
        
        {isTyping && (
          <div className="message-container received">
            <div className="message received typing-indicator">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chatbox-input">
        <button 
          className="attach-button" 
          onClick={handleFileUpload}
          disabled={isTyping}
          title="Attach file"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 6V17.5C16.5 19.71 14.71 21.5 12.5 21.5C10.29 21.5 8.5 19.71 8.5 17.5V5C8.5 3.62 9.62 2.5 11 2.5C12.38 2.5 13.5 3.62 13.5 5V15.5C13.5 16.05 13.05 16.5 12.5 16.5C11.95 16.5 11.5 16.05 11.5 15.5V6H10V15.5C10 16.88 11.12 18 12.5 18C13.88 18 15 16.88 15 15.5V5C15 2.79 13.21 1 11 1C8.79 1 7 2.79 7 5V17.5C7 20.54 9.46 23 12.5 23C15.54 23 18 20.54 18 17.5V6H16.5Z" fill="currentColor"/>
          </svg>
        </button>
        <button 
          className="gallery-button" 
          onClick={handleImageUpload}
          disabled={isTyping}
          title="Attach image"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="currentColor"/>
          </svg>
        </button>
        <input
          ref={inputRef}
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isTyping}
        />
        <button 
          className="send-button"
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isTyping}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
