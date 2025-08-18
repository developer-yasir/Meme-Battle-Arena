import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import './Settings.css';

const Settings = () => {
  const { user, clearUsername } = useContext(AuthContext);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleClearUsername = () => {
    clearUsername();
    alert('Username cleared successfully!');
    setShowConfirmClear(false);
  };

  return (
    <div className="settings-page container">
      <h1>Settings</h1>

      <div className="card">
        <h2>Account Settings</h2>
        {user ? (
          <>
            <p>Logged in as: <strong>{user.username}</strong></p>
            <button onClick={() => setShowConfirmClear(true)} className="clear-username-button">
              Clear Username
            </button>
            {showConfirmClear && (
              <div className="confirm-dialog">
                <p>Are you sure you want to clear your username? You will need to set a new one.</p>
                <button onClick={handleClearUsername} className="confirm-button">Yes, Clear</button>
                <button onClick={() => setShowConfirmClear(false)} className="cancel-button">Cancel</button>
              </div>
            )}
          </>
        ) : (
          <p>You are not currently logged in with a username.</p>
        )}
      </div>

      <div className="card">
        <h2>Notification Settings</h2>
        <p>Manage your notification preferences.</p>
        <div className="setting-item">
          <label>
            <input type="checkbox" defaultChecked /> Receive new meme notifications
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input type="checkbox" /> Receive leaderboard updates
          </label>
        </div>
      </div>

      <div className="card">
        <h2>Privacy Settings</h2>
        <p>Control your privacy on Meme Battle Arena.</p>
        <div className="setting-item">
          <label>
            <input type="checkbox" defaultChecked /> Show my memes on profile
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input type="checkbox" /> Allow others to see my vote history
          </label>
        </div>
      </div>

      <div className="card">
        <h2>General Settings</h2>
        <p>Adjust general application settings.</p>
        <div className="setting-item">
          <label>
            <input type="checkbox" defaultChecked /> Enable dark mode (Coming Soon!)
          </label>
        </div>
      </div>

    </div>
  );
};

export default Settings;