import React, { useContext } from 'react';
import { MenuContext } from '../../App';
import { Link } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import BottomNav from '../../components/Navigation/BottomNav/BottomNav';
import '../../styles/shared.css';
import './Settings.css';

const Settings = () => {
    const { toggleMenu, theme, setTheme } = useContext(MenuContext);
    const { signOut } = useClerk();

    const handleThemeToggle = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
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
        <div className="page-container settings-container">
            <header className="page-header settings-header">
                <button onClick={toggleMenu} className="menu-button">☰</button>
                <h1 className="page-title settings-title">Settings</h1>
            </header>

            <div className="page-content settings-content">
                {Object.entries(sections).map(([sectionName, items]) => (
                    <div key={sectionName} className="settings-section-card">
                        <div className="settings-section-title">{sectionName}</div>
                        <ul className="settings-items-list">
                            {items.map((item, index) => (
                                <li key={index}>
                                    {item.label === 'About' ? (
                                        <Link to="/about" className="settings-item">
                                            <div className="settings-item-left">
                                                <span className="settings-item-label">{item.label}</span>
                                            </div>
                                            <div className="settings-item-right">
                                                <span className="arrow">›</span>
                                            </div>
                                        </Link>
                                    ) : item.label === 'Edit Account' ? (
                                        <Link to="/account" className="settings-item">
                                            <div className="settings-item-left">
                                                <span className="settings-item-label">{item.label}</span>
                                            </div>
                                            <div className="settings-item-right">
                                                <span className="item-value">{item.value}</span>
                                                <span className="arrow">›</span>
                                            </div>
                                        </Link>
                                    ) : item.label === 'Privacy Policy' ? (
                                        <Link to="/privacy-policy" className="settings-item">
                                            <div className="settings-item-left">
                                                <span className="settings-item-label">{item.label}</span>
                                            </div>
                                            <div className="settings-item-right">
                                                <span className="arrow">›</span>
                                            </div>
                                        </Link>
                                    ) : item.label === 'Terms of Use' ? (
                                        <Link to="/terms-of-use" className="settings-item">
                                            <div className="settings-item-left">
                                                <span className="settings-item-label">{item.label}</span>
                                            </div>
                                            <div className="settings-item-right">
                                                <span className="arrow">›</span>
                                            </div>
                                        </Link>
                                    ) : (
                                        <button 
                                            className="settings-item" 
                                            onClick={item.action}
                                        >
                                            <div className="settings-item-left">
                                                <span className="settings-item-label">{item.label}</span>
                                            </div>
                                            <div className="settings-item-right">
                                                {item.value && <span className="item-value">{item.value}</span>}
                                                <span className="arrow">›</span>
                                            </div>
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <BottomNav />
        </div>
    );
};

export default Settings; 