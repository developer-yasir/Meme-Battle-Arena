
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Meme Battle Arena</Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/how-to-play">How to Play</Link>
        <Link to="/about-us">About Us</Link>
        <Link to="/contact-us">Contact Us</Link>
        {user ? (
          <>
            <Link to={`/profile/${user.username}`}>Profile</Link>
            <Link to="/settings">Settings</Link> {/* Added Settings link */}
            <span>Welcome, {user.username}!</span>
          </>
        ) : (
          // No links here, as UsernamePrompt will cover the screen
          null
        )}
      </div>
    </nav>
  );
};

export default Navbar;
