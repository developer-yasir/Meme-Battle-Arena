import React, { useState } from 'react';
import API from '../utils/api';
import './Polls.css';

const Polls = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [expiresAt, setExpiresAt] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pollOptions = options.filter(option => option.trim() !== '').map(option => ({ text: option }));
      if (pollOptions.length < 2) {
        alert('Please provide at least two non-empty options.');
        return;
      }

      const pollData = {
        question,
        options: pollOptions,
        expiresAt: expiresAt ? new Date(expiresAt).toISOString() : undefined,
      };

      await API.post('/polls', pollData);
      alert('Poll created successfully!');
      setQuestion('');
      setOptions(['', '']);
      setExpiresAt('');
    } catch (error) {
      console.error('Error creating poll:', error);
      alert(error.response?.data?.message || 'Failed to create poll.');
    }
  };

  return (
    <div className="polls-container">
      <h1>Create New Poll</h1>
      <form onSubmit={handleSubmit} className="poll-form">
        <div className="form-group">
          <label htmlFor="question">Poll Question:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Options:</label>
          {options.map((option, index) => (
            <div key={index} className="option-input-group">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                required
              />
              {options.length > 2 && (
                <button type="button" onClick={() => handleRemoveOption(index)} className="remove-option-button">
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddOption} className="add-option-button">
            Add Option
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="expiresAt">Expires At (Optional):</label>
          <input
            type="datetime-local"
            id="expiresAt"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-poll-button">
          Create Poll
        </button>
      </form>
    </div>
  );
};

export default Polls;
