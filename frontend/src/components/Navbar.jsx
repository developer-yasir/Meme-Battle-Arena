
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, clearUsername } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Meme Battle Arena</Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <span>Welcome, {user.username}!</span>
            <button onClick={clearUsername}>Clear Username</button>
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
