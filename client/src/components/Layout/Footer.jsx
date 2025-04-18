import React from 'react';

const Footer = () => {
    return (
        <footer style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa' }}>
            <p>&copy; {new Date().getFullYear()} The Digital Diner. All rights reserved.</p>
            <p>Follow us on social media!</p>
        </footer>
    );
};

export default Footer;