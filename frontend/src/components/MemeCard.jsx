
import React, { useContext } from 'react';
import API from '../utils/api';
import AuthContext from '../context/AuthContext';
import './MemeCard.css';

const MemeCard = ({ meme }) => {
  const { user } = useContext(AuthContext);

  const handleVote = async () => {
    if (!user || !user.username) {
      alert("Please set a username to vote.");
      return;
    }
    try {
      await API.put(`/memes/${meme._id}/vote`, { username: user.username });
    } catch (error) {
      console.error(error);
      alert(error.response.data.message || "Failed to vote.");
    }
  };

  return (
    <div className="meme-card">
      <img src={meme.imageUrl} alt={meme.caption} />
      <div className="meme-card-content">
        <h3>{meme.caption}</h3>
        <p>Uploaded by: {meme.user.username}</p>
      </div>
      <div className="meme-card-actions">
        <span>Votes: {meme.votes.length}</span>
        {user && (
          <button onClick={handleVote}>
            Vote
          </button>
        )}
      </div>
    </div>
  );
};

export default MemeCard;
