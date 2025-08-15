
import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import API from '../utils/api';
import AuthContext from '../context/AuthContext';
import MemeCard from '../components/MemeCard';
import MemeForm from '../components/MemeForm';
import './Home.css';

const Home = () => {
  const [memes, setMemes] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const socket = io('http://localhost:5000');

    const fetchMemes = async () => {
      try {
        const { data } = await API.get('/memes');
        setMemes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMemes();

    socket.on('newMeme', (newMeme) => {
      setMemes((prevMemes) => [newMeme, ...prevMemes]);
    });

    socket.on('newVote', (updatedMeme) => {
      setMemes((prevMemes) =>
        prevMemes.map((meme) => (meme._id === updatedMeme._id ? updatedMeme : meme))
      );
    });

    return () => {
      socket.disconnect(); // Disconnect socket when component unmounts
    };
  }, []);

  return (
    <div className="home-page">
      <h1>Meme Battle Arena</h1>
      <p>Upload, Vote, and Crown the Meme King of the Day!</p>

      <div className="container">
        {user && (
          <div className="meme-form-section">
            <MemeForm />
          </div>
        )}

        <h2>Live Meme Board</h2>
        <div className="meme-grid">
          {memes.map((meme) => (
            <MemeCard key={meme._id} meme={meme} />
          ))}
        </div>

        <aside className="sidebar">
          <h3>Meme King of the Day</h3>
          <p>[Winner Announcement Placeholder]</p>

          <h3>Leaderboard</h3>
          <ul>
            <li><span>Meme 1</span> <span>100 Votes</span></li>
            <li><span>Meme 2</span> <span>90 Votes</span></li>
            <li><span>Meme 3</span> <span>80 Votes</span></li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Home;
