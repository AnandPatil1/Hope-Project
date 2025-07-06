import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MenuContext } from '../../../App';
import { useClerk } from '@clerk/clerk-react';
import '../../../styles/shared.css';
import './ResourceDetail.css';

const ResourceDetail = () => {
    const { toggleMenu } = useContext(MenuContext);
    const { user } = useClerk();
    const { resourceId } = useParams();
    const navigate = useNavigate();

    const getResourceContent = (id) => {
        switch (id) {
            case '1':
                return {
                    title: 'How to Study Computer Science',
                    description: 'Mastering computer science requires a combination of theoretical understanding and practical application. Here are proven strategies to excel in your CS studies.',
                    tips: [
                        'Practice coding daily - even 30 minutes of consistent practice builds strong programming skills',
                        'Understand the fundamentals - focus on data structures, algorithms, and problem-solving patterns',
                        'Work on real projects - apply your knowledge to build applications and solve real-world problems',
                        'Use online resources - platforms like LeetCode, HackerRank, and GitHub are invaluable',
                        'Learn to debug effectively - understanding how to troubleshoot is as important as writing code',
                        'Study with peers - join study groups or coding communities to learn from others',
                        'Read code written by others - this helps you understand different approaches and best practices'
                    ]
                };
            case '2':
                return {
                    title: 'How to Study Mathematics',
                    description: 'Mathematics is built on logical reasoning and systematic problem-solving. These strategies will help you develop a strong mathematical foundation.',
                    tips: [
                        'Master the basics first - ensure you understand fundamental concepts before moving to advanced topics',
                        'Practice regularly - solve problems daily to build confidence and speed',
                        'Understand, don\'t memorize - focus on why formulas work, not just how to use them',
                        'Work backwards - sometimes starting with the answer helps you understand the process',
                        'Use visual aids - draw diagrams, graphs, and charts to visualize mathematical concepts',
                        'Teach others - explaining concepts to someone else reinforces your own understanding',
                        'Review and reflect - regularly go back to previous topics to maintain retention'
                    ]
                };
            case '3':
                return {
                    title: 'How to Study Physics',
                    description: 'Physics combines mathematical rigor with conceptual understanding. These methods will help you grasp both the theory and applications.',
                    tips: [
                        'Understand the concepts first - focus on the "why" before the "how" of formulas',
                        'Draw diagrams - visualize problems and forces to better understand the situation',
                        'Practice with real-world examples - connect physics concepts to everyday phenomena',
                        'Master the units - always check that your units make sense in calculations',
                        'Work through problems step-by-step - don\'t skip steps, show your reasoning',
                        'Use multiple representations - graphs, equations, and words all describe the same physics',
                        'Connect related concepts - understand how different topics in physics relate to each other'
                    ]
                };
            default:
                return {
                    title: 'Resource Not Found',
                    description: 'This resource could not be found.',
                    tips: []
                };
        }
    };

    const content = getResourceContent(resourceId);

    return (
        <div className="resource-detail-page">
            <header className="resource-detail-header">
                <button onClick={() => navigate('/resources')} className="back-button">‹</button>
                <h1 className="resource-detail-title">{content.title}</h1>
                <img 
                    src={user?.imageUrl || "/assets/profile.png"} 
                    alt="Profile" 
                    className="profile-pic" 
                    onClick={() => navigate('/account')}
                    style={{ cursor: 'pointer' }}
                />
            </header>

            <div className="resource-detail-content">
                <div className="resource-detail-card">
                    <h2 className="resource-detail-name">{content.title}</h2>
                    <p className="resource-detail-description">{content.description}</p>
                    
                    {content.tips.length > 0 && (
                        <div className="study-tips">
                            <h3>Key Study Strategies:</h3>
                            <ul>
                                {content.tips.map((tip, index) => (
                                    <li key={index}>{tip}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResourceDetail; 