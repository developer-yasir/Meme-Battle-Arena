
import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { Bar, Doughnut } from 'react-chartjs-2';
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
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="mb-4">
        <button onClick={handleStartRound} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Start New Round</button>
        <button onClick={handleEndRound} className="bg-red-500 text-white px-4 py-2 rounded">End Current Round</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg text-white">
          <h2 className="text-xl font-bold mb-2">Memes Uploaded Per Day</h2>
          {memesPerDay.labels && <Bar data={memesPerDay} />}
        </div>

        <div className="bg-gray-800 p-4 rounded-lg text-white">
          <h2 className="text-xl font-bold mb-2">Most Voted Meme of All Time</h2>
          {mostVotedMeme ? (
            <div>
              <img src={mostVotedMeme.imageUrl} alt={mostVotedMeme.caption} className="w-full rounded-lg mb-2" />
              <p className="text-lg">{mostVotedMeme.caption}</p>
              <p>Votes: {mostVotedMeme.voteCount}</p>
            </div>
          ) : (
            <p>No memes yet.</p>
          )}
        </div>

        <div className="bg-gray-800 p-4 rounded-lg text-white">
          <h2 className="text-xl font-bold mb-2">Active Users Per Round</h2>
          <p className="text-4xl font-bold">{activeUsers}</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg text-white">
          <h2 className="text-xl font-bold mb-2">Current Round Winner</h2>
          {currentWinner ? (
            <div>
              <img src={currentWinner.imageUrl} alt={currentWinner.caption} className="w-full rounded-lg mb-2" />
              <p className="text-lg">{currentWinner.caption}</p>
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
