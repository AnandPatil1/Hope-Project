import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuContext } from '../App';
import lightbulbIcon from '../assets/light bulb.svg';
import './Resources.css';

const Resources = () => {
    const { toggleMenu } = useContext(MenuContext);
    const navigate = useNavigate();

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

    return (
        <div className="resources-page">
            <header className="resources-header">
                <button onClick={toggleMenu} className="menu-button">☰</button>
                <h1 className="resources-title">Recommended Resources</h1>
                <img src="/assets/profile.png" alt="Profile" className="profile-pic" />
            </header>

            <div className="search-container">
                <span className="search-icon-input">🔍</span>
                <input type="text" placeholder="Search for a specific topic..." />
            </div>

            <div className="resources-content">
                <p className="resources-intro">
                    Here are some recommended resources based on your interests and areas you lack in:
                </p>

                <div className="resources-list">
                    {recommendedResources.map((resource, index) => (
                        <div 
                            key={index} 
                            className="resource-card"
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
                    ))}
                </div>
            </div>
            
            <div className="more-resources-input">
                <input type="text" placeholder="Need more resources?" />
                <button className="gallery-button">🖼️</button>
                <button className="attach-button">📎</button>
            </div>
        </div>
    );
};

export default Resources; 