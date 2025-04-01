import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Navbar() {
    const items = [
        'Home',
        'Account',
        'Saving',
        'Spending',
        'Learn More',
        'Settings'
    ];

    // Mock data for item details
    const itemDetails = {
        Home: {
            title: 'Welcome to the homepage',
            description: 'This is the main landing page of the site.',
            options: []
        },
        Account: {
            title: 'Account Details',
            description: 'Manage your account information and settings.',
            options: ['View Profile', 'Edit Profile', 'Change Password']
        },
        Saving: {
            title: 'Saving Details',
            description: 'View and manage your savings account.',
            options: ['View Savings', 'Add Funds', 'Withdraw Funds']
        },
        Spending: {
            title: 'Spending Details',
            description: 'Track and manage your spending account.',
            options: ['View Transactions', 'Set Spending Limits']
        },
        'Learn More': {
            title: 'Learn More',
            description: 'Find additional resources and information.',
            options: ['FAQs', 'Contact Support', 'Documentation']
        },
        Settings: {
            title: 'Settings',
            description: 'Manage your preferences and site settings.',
            options: ['User Account', 'Site Preferences', 'Notifications']
        }
    };

    // Hook to track the currently active Offcanvas
    const [activeIndex, setActiveIndex] = useState(-1);

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navigation</a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarText"
                        aria-controls="navbarText"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {items.map((item, index) => (
                                <li
                                    key={index}
                                    className="nav-item"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <a
                                        className="nav-link"
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Render Offcanvas for the active item */}
            {activeIndex !== -1 && (
                <Offcanvas
                    show={activeIndex !== -1}
                    onHide={() => setActiveIndex(-1)}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>{items[activeIndex]}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <p>{itemDetails[items[activeIndex]].description}</p>
                        {itemDetails[items[activeIndex]].options.length > 0 && (
                            <ul>
                                {itemDetails[items[activeIndex]].options.map((option, idx) => (
                                    <li key={idx}>{option}</li>
                                ))}
                            </ul>
                        )}
                    </Offcanvas.Body>
                </Offcanvas>
            )}
        </div>
    );
}

export default Navbar;