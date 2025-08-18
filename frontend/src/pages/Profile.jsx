import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/api';
import MemeCard from '../components/MemeCard';
import AuthContext from '../context/AuthContext'; // Import AuthContext
import './Profile.css';

const Profile = () => {
  const { username } = useParams();
  const { user: loggedInUser } = useContext(AuthContext); // Get logged-in user from context
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/users/${username}`);
      setProfileData(data);
      setBio(data.bio || ''); // Set bio for editing
      setAvatar(data.avatar || ''); // Set avatar for editing
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [username]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.put(`/users/${username}`, { bio, avatar });
      setProfileData(data); // Update profile data with response
      setIsEditing(false); // Exit edit mode
      alert('Profile updated successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update profile');
    }
  };

  if (loading) {
    return <div className="profile-page container text-center">Loading profile...</div>;
  }

  if (error) {
    return <div className="profile-page container text-center error-message">Error: {error}</div>;
  }

  if (!profileData) {
    return <div className="profile-page container text-center">Profile not found.</div>;
  }

  const isOwner = loggedInUser && loggedInUser.username === username;

  return (
    <div className="profile-page container">
      <div className="profile-header card">
        <img src={profileData.avatar} alt={profileData.username} className="profile-avatar" />
        <h1>{profileData.username}</h1>
        <p>Total Votes on Memes: {profileData.totalVotes}</p>
        {profileData.bio && <p className="profile-bio">{profileData.bio}</p>}
        
        {isOwner && !isEditing && (
          <button onClick={() => setIsEditing(true)} className="edit-profile-button">
            Edit Profile
          </button>
        )}

        {isOwner && isEditing && (
          <form onSubmit={handleUpdateProfile} className="edit-profile-form">
            <div className="form-group">
              <label htmlFor="bio">Bio:</label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="avatar">Avatar URL:</label>
              <input
                type="text"
                id="avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="Enter avatar URL"
              />
            </div>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">
              Cancel
            </button>
          </form>
        )}
      </div>

      <h2>{profileData.username}'s Memes</h2>
      {profileData.memes.length > 0 ? (
        <div className="meme-grid">
          {profileData.memes.map((meme) => (
            <MemeCard key={meme._id} meme={meme} />
          ))}
        </div>
      ) : (
        <p className="text-center">This user hasn't created any memes yet.</p>
      )}
    </div>
  );
};

export default Profile;