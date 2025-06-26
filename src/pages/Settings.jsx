import React, { useContext, useState, useEffect } from 'react';
import { MenuContext } from '../App';
import { Link } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import './Settings.css';

const Settings = () => {
    const { toggleMenu } = useContext(MenuContext);
    const { signOut } = useClerk();

    // Theme state
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'light';
        }
        return 'light';
    });

    useEffect(() => {
        document.body.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleThemeToggle = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const handleSignOut = () => {
        signOut();
    };

    const sections = {
        'General': [
            { label: 'Theme', value: theme === 'dark' ? 'Dark' : 'Light', action: handleThemeToggle },
            { label: 'About' }
        ],
        'Account': [
            { label: 'Edit Account', value: 'johndoe@gmail.com' },
            { label: 'Notifications' },
            { label: 'Sign Out', action: handleSignOut }
        ],
        'Billing Information': [
            { label: 'Payment Methods' },
            { label: 'Subscription' }
        ],
        'Legal': [
            { label: 'Privacy Policy' },
            { label: 'Terms of Use' }
        ]
    };

    return (
        <div className="settings-container">
            <header className="settings-header">
                <button onClick={toggleMenu} className="menu-button">☰</button>
                <h1 className="settings-title">Settings</h1>
            </header>

            <main className="settings-content">
                {Object.entries(sections).map(([title, items]) => (
                    <section key={title} className="settings-section-card">
                        <h2 className="settings-section-title">{title}</h2>
                        <div className="settings-items-list">
                            {items.map((item, index) => {
                                const isLink = item.label === 'Edit Account';
                                const isAbout = item.label === 'About';
                                const isPrivacyPolicy = item.label === 'Privacy Policy';
                                const isTermsOfUse = item.label === 'Terms of Use';
                                const isSignOut = item.label === 'Sign Out';
                                const isTheme = item.label === 'Theme';
                                const Wrapper = (isLink || isAbout || isPrivacyPolicy || isTermsOfUse) ? Link : 'div';
                                const props = isLink ? { to: '/account' } : 
                                            isAbout ? { to: '/about' } : 
                                            isPrivacyPolicy ? { to: '/privacy-policy' } :
                                            isTermsOfUse ? { to: '/terms-of-use' } : {};
                                if (isSignOut) {
                                    return (
                                        <div key={item.label} className="settings-item" onClick={item.action}>
                                            <div className="settings-item-left">
                                                <span className="settings-item-label">{item.label}</span>
                                            </div>
                                            <div className="settings-item-right">
                                                <span className="arrow">›</span>
                                            </div>
                                        </div>
                                    );
                                }
                                if (isTheme) {
                                    return (
                                        <div key={item.label} className="settings-item" onClick={item.action} style={{ cursor: 'pointer' }}>
                                            <div className="settings-item-left">
                                                <span className="settings-item-label">{item.label}</span>
                                            </div>
                                            <div className="settings-item-right">
                                                <span className="item-value">{item.value}</span>
                                                <span className="arrow">›</span>
                                            </div>
                                        </div>
                                    );
                                }
                                return (
                                    <Wrapper key={item.label} className="settings-item" {...props}>
                                        <div className="settings-item-left">
                                            <span className="settings-item-label">{item.label}</span>
                                        </div>
                                        <div className="settings-item-right">
                                            {item.value && <span className="item-value">{item.value}</span>}
                                            <span className="arrow">›</span>
                                        </div>
                                    </Wrapper>
                                );
                            })}
                        </div>
                    </section>
                ))}
            </main>

            <footer className="settings-footer">
                Need Help? <a href="#">Contact Us</a>
            </footer>
        </div>
    );
};

export default Settings; 