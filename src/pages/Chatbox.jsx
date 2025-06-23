import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuContext } from '../App';
import './Chatbox.css';

const Chatbox = () => {
  const navigate = useNavigate();
  const { toggleMenu } = useContext(MenuContext);
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
        <img src="/assets/profile.png" alt="avatar" className="avatar" />
        <div className="header-info">
          <p className="header-name">Helena Hills</p>
          <p className="header-course">AP Physics 1: Mechanics</p>
        </div>
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
          className="gallery-button" 
          onClick={handleImageUpload}
          disabled={isTyping}
        >
          🖼️
        </button>
        <button 
          className="attach-button" 
          onClick={handleFileUpload}
          disabled={isTyping}
        >
          📎
        </button>
        <button 
          className="send-button"
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isTyping}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default Chatbox; 