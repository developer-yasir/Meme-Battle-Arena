import React, { useState, useContext } from 'react';
import API from '../utils/api';
import AuthContext from '../context/AuthContext';
import './MemeForm.css';

const MemeForm = () => {
  const [text, setText] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { user } = useContext(AuthContext);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!user || !user.username) {
      alert("Please set a username to create a meme.");
      return;
    }

    try {
      await API.post('/memes', { description: text, username: user.username }); // Send username
      setText(''); // Clear form after submission
      setSuccessMessage('Meme created successfully!');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error(error);
      alert('Meme creation failed!');
    }
  };

  return (
    <div className="meme-form-container">
      <h2>Create a Text Meme</h2>
      <form onSubmit={onSubmit}>
        <div className="meme-form-group">
          <label htmlFor="memeText">Meme Text</label>
          <input
            type="text"
            id="memeText"
            name="memeText"
            value={text}
            onChange={onChange}
            placeholder="Enter your meme text here"
          />
        </div>
        <button type="submit" className="meme-form-button">
          Create Meme
        </button>
      </form>
      {successMessage && <p className="success-message pop-in">{successMessage}</p>}
    </div>
  );
};

export default MemeForm;