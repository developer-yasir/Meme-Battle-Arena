import React, { useState, useEffect, useContext } from 'react';
import API from '../utils/api';
import AuthContext from '../context/AuthContext';
import './PollWidget.css';

const PollWidget = () => {
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const { user } = useContext(AuthContext);

  const fetchActivePoll = async () => {
    try {
      const { data } = await API.get('/polls/active');
      setPoll(data);
      setHasVoted(false); // Reset vote status for new poll
    } catch (error) {
      console.error("Error fetching active poll:", error);
      setPoll(null);
    }
  };

  useEffect(() => {
    fetchActivePoll();
  }, []);

  const handleVote = async () => {
    if (!user) {
      alert("Please log in to vote.");
      return;
    }
    if (selectedOption === null) {
      alert("Please select an option.");
      return;
    }

    try {
      await API.post(`/polls/${poll._id}/vote`, { optionIndex: selectedOption });
      setHasVoted(true);
      // Re-fetch poll to update vote counts
      fetchActivePoll(); 
    } catch (error) {
      console.error("Error voting on poll:", error);
      alert(error.response?.data?.message || "Failed to cast vote.");
    }
  };

  if (!poll) {
    return <div className="poll-widget card">No active polls at the moment.</div>;
  }

  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className="poll-widget card">
      <h3>{poll.question}</h3>
      <div className="poll-options">
        {poll.options.map((option, index) => (
          <div key={index} className="poll-option">
            <label>
              <input
                type="radio"
                name="poll-option"
                value={index}
                checked={selectedOption === index}
                onChange={() => setSelectedOption(index)}
                disabled={hasVoted}
              />
              {option.text}
            </label>
            {hasVoted && (
              <span className="vote-count">
                ({option.votes} votes - {totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(1) : 0}%)
              </span>
            )}
          </div>
        ))}
      </div>
      {!hasVoted && user && (
        <button onClick={handleVote} className="vote-button">
          Vote
        </button>
      )}
      {hasVoted && <p className="vote-message">Thanks for voting!</p>}
    </div>
  );
};

export default PollWidget;
