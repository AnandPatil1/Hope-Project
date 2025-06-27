import React, { useContext } from 'react';
import { MenuContext } from '../App';
import './TermsOfUse.css';

const TermsOfUse = () => {
    const { toggleMenu } = useContext(MenuContext);

    return (
        <div className="terms-of-use-container">
            <header className="terms-of-use-header">
                <button onClick={toggleMenu} className="menu-button">☰</button>
                <h1 className="terms-of-use-title">Terms of Use</h1>
            </header>

            <main className="terms-of-use-content">
                <h1 className="terms-of-use-main-title">Terms of Use</h1>
                <p className="terms-of-use-description">This is terms of use! yay</p>
            </main>
        </div>
    );
};

export default TermsOfUse; 