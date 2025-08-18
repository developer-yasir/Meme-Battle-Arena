import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [memesPerDay, setMemesPerDay] = useState({});
  const [mostVotedMeme, setMostVotedMeme] = useState(null);
  const [activeUsers, setActiveUsers] = useState(0);
  const [currentWinner, setCurrentWinner] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data: memesPerDayData } = await API.get('/analytics/memes-per-day');
        setMemesPerDay({
          labels: memesPerDayData.map((data) => data._id),
          datasets: [
            {
              label: 'Memes Uploaded',
              data: memesPerDayData.map((data) => data.count),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        });

        const { data: mostVotedMemeData } = await API.get('/analytics/most-voted-meme');
        setMostVotedMeme(mostVotedMemeData);

        const { data: activeUsersData } = await API.get('/analytics/active-users-per-round');
        setActiveUsers(activeUsersData.count);

        const { data: winnerData } = await API.get('/rounds/winner');
        setCurrentWinner(winnerData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAnalytics();
  }, []);

  const handleStartRound = async () => {
    try {
      await API.post('/rounds/start');
      alert('Round started!');
    } catch (error) {
      console.error(error);
      alert('Failed to start round.');
    }
  };

  const handleEndRound = async () => {
    try {
      await API.post('/rounds/end');
      alert('Round ended!');
    } catch (error) {
      console.error(error);
      alert('Failed to end round.');
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-actions">
        <button onClick={handleStartRound}>Start New Round</button>
        <button onClick={handleEndRound}>End Current Round</button>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Memes Uploaded Per Day</h2>
          {memesPerDay.labels && <Bar data={memesPerDay} />}
        </div>
        <div className="dashboard-card">
          <h2>Most Voted Meme of All Time</h2>
          {mostVotedMeme ? (
            <div>
              <img src={mostVotedMeme.imageUrl} alt={mostVotedMeme.caption} />
              <p>{mostVotedMeme.caption}</p>
              <p>Votes: {mostVotedMeme.voteCount}</p>
            </div>
          ) : (
            <p>No memes yet.</p>
          )}
        </div>
        <div className="dashboard-card">
          <h2>Active Users Per Round</h2>
          <h3>{activeUsers}</h3>
        </div>
        <div className="dashboard-card">
          <h2>Current Round Winner</h2>
          {currentWinner ? (
            <div>
              <img src={currentWinner.imageUrl} alt={currentWinner.caption} />
              <p>{currentWinner.caption}</p>
              <p>Votes: {currentWinner.voteCount}</p>
            </div>
          ) : (
            <p>No winner yet for the current round.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;