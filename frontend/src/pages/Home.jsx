
import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import API from '../utils/api';
import AuthContext from '../context/AuthContext';
import MemeCard from '../components/MemeCard';
import MemeForm from '../components/MemeForm';
import UsernamePrompt from '../components/UsernamePrompt';
import { Link } from 'react-router-dom'; // Import Link for CTA
import './Home.css';

const Home = () => {
  const [memes, setMemes] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [memeKing, setMemeKing] = useState(null); // New state for Meme King
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

    const fetchLeaderboard = async () => {
      try {
        const { data } = await API.get('/users/leaderboard');
        setLeaderboard(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMemeKing = async () => {
      try {
        const { data } = await API.get('/memes/king');
        setMemeKing(data);
      } catch (error) {
        console.error("Error fetching Meme King:", error);
        setMemeKing(null); // Set to null if not found
      }
    };

    fetchMemes();
    fetchLeaderboard();
    fetchMemeKing(); // Fetch Meme King on component mount

    socket.on('newMeme', (newMeme) => {
      setMemes((prevMemes) => [newMeme, ...prevMemes]);
      fetchLeaderboard();
      fetchMemeKing(); // Refresh Meme King on new meme
    });

    socket.on('newVote', (updatedMeme) => {
      setMemes((prevMemes) =>
        prevMemes.map((meme) => (meme._id === updatedMeme._id ? updatedMeme : meme))
      );
      fetchLeaderboard();
      fetchMemeKing(); // Refresh Meme King on new vote
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const featuredMemes = memes.slice(0, 3); // Get top 3 recent memes for featured section

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <h1>Welcome to Meme Battle Arena!</h1>
          <p className="hero-subtitle">Unleash your creativity, share your humor, and vote for the funniest text memes!</p>
          <Link to="/how-to-play" className="hero-cta-button">How to Play</Link>
        </div>
      </section>

      <div className="container main-content-layout">
        <div className="main-content">
          {user && (
            <div className="meme-form-section">
              <MemeForm />
            </div>
          )}

          {featuredMemes.length > 0 && (
            <section className="featured-memes-section">
              <h2>Featured Memes</h2>
              <div className="meme-grid">
                {featuredMemes.map((meme) => (
                  <MemeCard key={meme._id} meme={meme} />
                ))}
              </div>
            </section>
          )}

          <h2>Live Meme Board</h2>
          <div className="meme-grid">
            {memes.map((meme) => (
              <MemeCard key={meme._id} meme={meme} />
            ))}
          </div>
        </div>

        <aside className="sidebar card">
          <h3>Meme King of the Day</h3>
          {memeKing ? (
            <div className="meme-king-display">
              <img src={memeKing.user.avatar} alt={memeKing.user.username} className="meme-king-avatar" />
              <p className="meme-king-username">{memeKing.user.username}</p>
              <p className="meme-king-text">"{memeKing.meme.text}"</p>
              <p className="meme-king-votes">with {memeKing.totalVotes} votes!</p>
              <p className="meme-king-date">on {new Date(memeKing.date).toDateString()}</p>
            </div>
          ) : (
            <p>No Meme King selected yet. Check back tomorrow!</p>
          )}

          <h3>Leaderboard</h3>
          <ul className="leaderboard-list">
            {leaderboard.length > 0 ? (
              leaderboard.map((entry, index) => (
                <li key={index} className="leaderboard-item">
                  <img src={entry.avatar} alt={entry.username} className="leaderboard-avatar" />
                  <span>{entry.username}</span>
                  <span>{entry.totalVotes} Votes</span>
                </li>
              ))
            ) : (
              <li>No leaderboard data yet.</li>
            )}
          </ul>
        </aside>
      </div>
      {!user && <UsernamePrompt />} {/* Display UsernamePrompt if no user is set */}
    </div>
  );
};

export default Home;
