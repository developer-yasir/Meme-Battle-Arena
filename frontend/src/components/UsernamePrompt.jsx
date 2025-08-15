import React, { useState, useContext, useEffect, useRef } from 'react';
import AuthContext from '../context/AuthContext';
import API from '../utils/api';
import './UsernamePrompt.css';

const UsernamePrompt = () => {
  const [username, setUsernameInput] = useState('');
  const [usernameAvailability, setUsernameAvailability] = useState(null); // null: checking, true: available, false: taken
  const { setUsername } = useContext(AuthContext);
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    if (username.trim() === '') {
      setUsernameAvailability(null);
      return;
    }

    setUsernameAvailability(null); // Indicate checking

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await API.get(`/users/check-username/${username}`);
        setUsernameAvailability(res.data.available);
      } catch (error) {
        console.error("Error checking username availability:", error);
        setUsernameAvailability(null); // Reset on error
      }
    }, 500); // Debounce for 500ms

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() && usernameAvailability) {
      try {
        const res = await API.post('/users/register-username', { username });
        setUsername(res.data); // Store the full user object
      } catch (error) {
        console.error("Error setting username:", error);
        alert("Failed to set username. Please try again.");
      }
    } else if (!username.trim()) {
      alert("Please enter a username.");
    } else if (usernameAvailability === false) {
      alert("Username is already taken.");
    }
  };

  return (
    <div className="username-prompt-overlay">
      <div className="username-prompt-card">
        <h2>Welcome!</h2>
        <p>Please enter a username to continue.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsernameInput(e.target.value)}
            required
          />
          {username.trim() !== '' && usernameAvailability === null && (
            <p className="checking-message">Checking availability...</p>
          )}
          {usernameAvailability === true && (
            <p className="available-message">Username available!</p>
          )}
          {usernameAvailability === false && (
            <p className="taken-message">Username taken.</p>
          )}
          <button type="submit" disabled={!username.trim() || !usernameAvailability}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default UsernamePrompt;