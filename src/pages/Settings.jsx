import React, { useContext } from 'react';
import { MenuContext } from '../App';
import { Link } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import './Settings.css';

const Settings = () => {
    const { toggleMenu } = useContext(MenuContext);
    const { signOut } = useClerk();

    const handleSignOut = () => {
        signOut();
    };

    const sections = {
        'General': [
            { label: 'Theme', value: 'Auto' },
            { label: 'About' }
        ],
        'Account': [
            { label: 'Edit Account', value: 'johndoe@gmail.com' },
            { label: 'Notifications' },
            { label: 'Sign Out' }
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
                                const isSignOut = item.label === 'Sign Out';
                                const Wrapper = isLink ? Link : 'div';
                                const props = isLink ? { to: '/account' } : {};
                                const clickHandler = isSignOut ? handleSignOut : undefined;

                                return (
                                    <Wrapper key={item.label} className="settings-item" {...props} onClick={clickHandler}>
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