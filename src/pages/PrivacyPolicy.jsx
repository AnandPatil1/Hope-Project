import React, { useContext } from 'react';
import { MenuContext } from '../App';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
    const { toggleMenu } = useContext(MenuContext);

    return (
        <div className="privacy-policy-container">
            <header className="privacy-policy-header">
                <button onClick={toggleMenu} className="menu-button">☰</button>
                <h1 className="privacy-policy-title">Privacy Policy</h1>
            </header>

            <main className="privacy-policy-content">
                <h1 className="privacy-policy-main-title">Privacy Policy</h1>
                <p className="privacy-policy-description">This is a privacy policy!</p>
            </main>
        </div>
    );
};

export default PrivacyPolicy; 