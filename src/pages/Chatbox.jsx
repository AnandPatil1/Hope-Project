import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuContext } from '../App';
import { useClerk } from '@clerk/clerk-react';
import './Chatbox.css';

const Chatbox = () => {
  const navigate = useNavigate();
  const { toggleMenu } = useContext(MenuContext);
  const { user } = useClerk();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'received',
      content: 'Oh?',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      type: 'received',
      content: 'Cool',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 3,
      type: 'received',
      content: 'How does it work?',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 4,
      type: 'sent',
      content: 'this is how you can communicate with the Ai Teacher',
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: 5,
      type: 'received',
      content: 'You just text any question or comment relating to the course and the AI will look through the uploaded Documents/ Resources and answer your question.',
      timestamp: new Date(Date.now() - 180000)
    },
    {
      id: 6,
      type: 'sent',
      content: 'Boom!',
      timestamp: new Date(Date.now() - 120000)
    },
    {
      id: 7,
      type: 'received',
      content: 'Hmmm',
      timestamp: new Date(Date.now() - 60000)
    },
    {
      id: 8,
      type: 'received',
      content: 'I think I get it',
      timestamp: new Date(Date.now() - 60000)
    },
    {
      id: 9,
      type: 'received',
      content: 'I can see here that I can also upload more documents or a picture if that would help me better.',
      timestamp: new Date(Date.now() - 60000)
    },
    {
      id: 10,
      type: 'received',
      content: 'thats pretty cool yay',
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

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

  const simulateAIResponse = async (userMessage) => {
    setIsTyping(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Simple response logic - you can replace this with actual AI integration
    let response = '';
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      response = 'Hello! How can I help you with your physics studies today?';
    } else if (lowerMessage.includes('force') || lowerMessage.includes('newton')) {
      response = 'Great question about forces! Newton\'s laws are fundamental to understanding motion. Would you like me to explain a specific concept or help you with a problem?';
    } else if (lowerMessage.includes('energy') || lowerMessage.includes('kinetic') || lowerMessage.includes('potential')) {
      response = 'Energy is a fascinating topic! We have kinetic energy (energy of motion) and potential energy (stored energy). What specific aspect would you like to explore?';
    } else if (lowerMessage.includes('help') || lowerMessage.includes('confused')) {
      response = 'I\'m here to help! Could you tell me what specific topic or problem you\'re struggling with? I can explain concepts, work through problems, or provide examples.';
    } else if (lowerMessage.includes('thank')) {
      response = 'You\'re welcome! Feel free to ask more questions anytime. Learning physics is a journey, and I\'m here to support you every step of the way.';
    } else {
      response = 'That\'s an interesting question! I\'d be happy to help you understand this concept better. Could you provide more details or let me know if you\'re working on a specific problem?';
    }
    
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

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Get AI response
    const aiResponse = await simulateAIResponse(userMessage.content);
    
    const aiMessage = {
      id: Date.now() + 1,
      type: 'received',
      content: aiResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
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

  return (
    <div className="app">
      <div className="chatbox-header">
        <button className="back-button" onClick={toggleMenu}>☰</button>
        <div className="header-info">
          <p className="header-name">Helena Hills</p>
          <p className="header-course">AP Physics 1: Mechanics</p>
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
                  {message.content}
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