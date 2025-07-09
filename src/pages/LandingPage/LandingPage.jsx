import React from 'react';
import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-container">
            <div className="landing-content">
                <h1>Welcome to HOPE</h1>
                <p>A new way to learn and connect with AI-powered teachers.</p>
                <div className="landing-buttons">
                    <SignInButton mode="modal">
                        <button className="landing-btn sign-in">Sign In</button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                        <button className="landing-btn sign-up">Sign Up</button>
                    </SignUpButton>
                </div>
            </div>
        </div>
    );
};

export default LandingPage; 