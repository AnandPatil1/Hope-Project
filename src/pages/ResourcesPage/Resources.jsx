import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuContext } from '../../App';
import lightbulbIcon from '../../assets/light bulb.svg';
import { useClerk } from '@clerk/clerk-react';
import '../../styles/shared.css';
import './Resources.css';

const Resources = () => {
    const { toggleMenu } = useContext(MenuContext);
    const { user } = useClerk();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [inputMessage, setInputMessage] = useState('');
    const [generatedResources, setGeneratedResources] = useState([]);

    const recommendedResources = [
        {
            id: 1,
            title: 'How to Study Computer Science',
            description: 'Essential strategies and techniques for mastering CS concepts and programming'
        },
        {
            id: 2,
            title: 'How to Study Mathematics',
            description: 'Proven methods for understanding mathematical concepts and problem-solving'
        },
        {
            id: 3,
            title: 'How to Study Physics',
            description: 'Effective approaches to learning physics principles and applying formulas'
        }
    ];

    const handleResourceClick = (resourceId) => {
        navigate(`/resources/${resourceId}`);
    };

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        // Generate new resources based on the input
        const newResources = [
            {
                id: Date.now(),
                title: `Materials for ${inputMessage}`,
                description: `Comprehensive study materials and resources for ${inputMessage}`,
                isGenerated: true
            },
            {
                id: Date.now() + 1,
                title: `Advanced ${inputMessage} Concepts`,
                description: `Deep dive into advanced topics and techniques for ${inputMessage}`,
                isGenerated: true
            },
            {
                id: Date.now() + 2,
                title: `${inputMessage} Practice Problems`,
                description: `Hands-on exercises and practice materials for ${inputMessage}`,
                isGenerated: true
            }
        ];

        setGeneratedResources(newResources);
        setSearchQuery(''); // Clear search to show only generated resources
        setInputMessage('');
    };

    const handleFileUpload = () => {
        // TODO: Implement file upload functionality
        alert('File upload functionality coming soon!');
    };

    const handleImageUpload = () => {
        // TODO: Implement image upload functionality
        alert('Image upload functionality coming soon!');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const filteredResources = recommendedResources.filter(resource =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Show generated resources if they exist, otherwise show filtered resources
    const allResources = generatedResources.length > 0 ? generatedResources : filteredResources;

    return (
        <div className="page-container resources-page">
            <header className="page-header resources-header">
                <button onClick={toggleMenu} className="menu-button">☰</button>
                <h1 className="page-title resources-title">Recommended Resources</h1>
                <img 
                    src={user?.imageUrl || "/assets/profile.png"} 
                    alt="Profile" 
                    className="profile-pic" 
                    onClick={() => navigate('/account')}
                    style={{ cursor: 'pointer' }}
                />
            </header>

            <div className="search-container">
                <svg className="search-icon-input" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input 
                    type="text" 
                    placeholder="Search for a specific topic..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="page-content resources-content">
                <p className="resources-intro">
                    {searchQuery ? `Search results for "${searchQuery}":` : 'Here are some recommended resources based on your interests and areas you lack in:'}
                </p>

                <div className="resources-list">
                    {allResources.length > 0 ? (
                        allResources.map((resource, index) => (
                            <div 
                                key={resource.id} 
                                className={`resource-card ${resource.isGenerated ? 'generated-resource' : ''}`}
                                onClick={() => handleResourceClick(resource.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="resource-icon-container">
                                    <img src={lightbulbIcon} alt="Lightbulb" className="resource-icon" />
                                </div>
                                <div className="resource-info">
                                    <h3>{resource.title}</h3>
                                    <p>{resource.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <p>No resources found for "{searchQuery}". Try a different search term.</p>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="resources-input">
                <button 
                    className="attach-button" 
                    onClick={handleFileUpload}
                    title="Attach file"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5 6V17.5C16.5 19.71 14.71 21.5 12.5 21.5C10.29 21.5 8.5 19.71 8.5 17.5V5C8.5 3.62 9.62 2.5 11 2.5C12.38 2.5 13.5 3.62 13.5 5V15.5C13.5 16.05 13.05 16.5 12.5 16.5C11.95 16.5 11.5 16.05 11.5 15.5V6H10V15.5C10 16.88 11.12 18 12.5 18C13.88 18 15 16.88 15 15.5V5C15 2.79 13.21 1 11 1C8.79 1 7 2.79 7 5V17.5C7 20.54 9.46 23 12.5 23C15.54 23 18 20.54 18 17.5V6H16.5Z" fill="currentColor"/>
                    </svg>
                </button>
                <button 
                    className="gallery-button" 
                    onClick={handleImageUpload}
                    title="Attach image"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="currentColor"/>
                    </svg>
                </button>
                <input 
                    type="text" 
                    placeholder="Ask for specific resources..." 
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button 
                    className="send-button"
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Resources; 