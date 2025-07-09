import React, { useContext } from 'react';
import { UserProfile } from '@clerk/clerk-react';
import { MenuContext } from '../../../App';
import '../../../styles/shared.css';
import './EditAccount.css';

const EditAccount = () => {
    const { toggleMenu } = useContext(MenuContext);

    return (
        <div className="account-page-container">
            <header className="account-page-header">
                <button onClick={toggleMenu} className="menu-button">☰</button>
                <h1 className="account-page-title">Manage Account</h1>
            </header>
            <main className="account-page-content">
                <UserProfile routing="path" path="/account" />
            </main>
        </div>
    );
};

export default EditAccount; 