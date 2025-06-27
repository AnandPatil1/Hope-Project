import React from 'react';
import { UserProfile } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import './EditAccount.css';

const EditAccount = () => {
    return (
        <div className="account-page-container">
            <header className="account-page-header">
                <Link to="/settings" className="back-button">←</Link>
                <h1 className="account-page-title">Manage Account</h1>
            </header>
            <main className="account-page-content">
                <UserProfile routing="path" path="/account" />
            </main>
        </div>
    );
};

export default EditAccount; 