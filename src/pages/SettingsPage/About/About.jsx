import React, { useContext } from 'react';
import { MenuContext } from '../../../App';
import './About.css';

const About = () => {
    const { toggleMenu } = useContext(MenuContext);

    return (
        <div className="about-container">
            <header className="about-header">
                <button onClick={toggleMenu} className="menu-button">☰</button>
                <h1 className="about-title">About</h1>
            </header>

            <main className="about-content">
                <h1 className="about-main-title">About</h1>
                <p className="about-description">This is an app for learning!</p>
            </main>
        </div>
    );
};

export default About; 