import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-tagline">Ready to battle? Your memes await!</p>
        <p>&copy; {new Date().getFullYear()} Meme Battle Arena. All rights reserved.</p>
        <div className="footer-links">
          <a href="/about-us">About Us</a>
          <a href="/contact-us">Contact Us</a>
          <a href="/how-to-play">How to Play</a>
          <a href="/settings">Settings</a>
        </div>
        <div className="social-icons">
          <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
          <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;