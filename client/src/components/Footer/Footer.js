import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="catch-em-all-footer">
      <div className="footer-content">
        <div className="footer-buttons">
          <a href="https://github.com/Angel24e/Catch-em-all" target="_blank" rel="noreferrer" className="footer-button">
            GitHub Repository
          </a>
          {/* Add more buttons or links as needed */}
        </div>
        <div className="copyright">
          &copy; Group Catch-em-all. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
