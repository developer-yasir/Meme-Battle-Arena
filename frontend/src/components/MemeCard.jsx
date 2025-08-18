
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import AuthContext from '../context/AuthContext';
import io from 'socket.io-client'; // Import socket.io-client
import './MemeCard.css';

const MemeCard = ({ meme }) => {
  const { user } = useContext(AuthContext);
  const [isVoting, setIsVoting] = useState(false);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');

  const fetchComments = async () => {
    try {
      const { data } = await API.get(`/memes/${meme._id}/comments`);
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();

    const socket = io('http://localhost:5000');

    socket.on('newComment', (comment) => {
      if (comment.meme === meme._id) {
        setComments((prevComments) => [...prevComments, comment]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [meme._id]);

  const handleVote = async () => {
    if (!user || !user.username) {
      alert("Please set a username to vote.");
      return;
    }
    setIsVoting(true);
    try {
      await API.put(`/memes/${meme._id}/vote`, { username: user.username });
    } catch (error) {
      console.error(error);
      alert(error.response.data.message || "Failed to vote.");
    } finally {
      setIsVoting(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user || !user.username) {
      alert("Please set a username to comment.");
      return;
    }
    if (!newCommentText.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      await API.post(`/memes/${meme._id}/comments`, { text: newCommentText, username: user.username });
      setNewCommentText(''); // Clear comment input
    } catch (error) {
      console.error("Error adding comment:", error);
      alert(error.response.data.message || "Failed to add comment.");
    }
  };

  return (
    <div className="meme-card">
      <div className="meme-card-content">
        <h3>{meme.text}</h3>
        <p>Uploaded by: 
          {meme.user && meme.user.username ? (
            <Link to={`/profile/${meme.user.username}`}>{meme.user.username}</Link>
          ) : (
            'Unknown User'
          )}
        </p>
      </div>
      <div className="meme-card-actions">
        <span>Votes: {meme.votes.length}</span>
        {user && (
          <button onClick={handleVote} className={isVoting ? 'pulse' : ''}>
            Vote
          </button>
        )}
      </div>

      <div className="meme-card-comments">
        <h4>Comments ({comments.length})</h4>
        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="comment-item">
                <img src={comment.user.avatar} alt={comment.user.username} className="comment-avatar" />
                <p>
                  <strong><Link to={`/profile/${comment.user.username}`}>{comment.user.username}</Link>:</strong> {comment.text}
                </p>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first!</p>
          )}
        </div>
        {user && (
          <form onSubmit={handleAddComment} className="comment-form">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
            />
            <button type="submit">Comment</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MemeCard;
