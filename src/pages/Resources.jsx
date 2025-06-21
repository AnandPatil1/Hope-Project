import React, { useContext } from 'react';
import { MenuContext } from '../App';
import './Resources.css';

const Resources = () => {
    const { toggleMenu } = useContext(MenuContext);

    const recommendedResources = [
        {
            title: 'Effective Exam Preparation',
            description: 'Strategies for studying and passing your exam on subject X',
            icon: '💡'
        },
        {
            title: 'Effective Exam Preparation',
            description: 'Strategies for studying and passing your exam on subject Y',
            icon: '💡'
        },
        {
            title: 'Effective Exam Preparation',
            description: 'Strategies for studying and passing your exam on subject Z',
            icon: '💡'
        }
    ];

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
                        <div key={index} className="resource-card">
                            <div className="resource-icon-container">
                                {resource.icon}
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