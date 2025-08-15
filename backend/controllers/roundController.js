
const Meme = require('../models/Meme');

let currentRound = null;
let roundTimer = null;

const startRound = async (req, res) => {
  if (req.user.role !== 'admin') {
    res.status(403).json({ message: 'Not authorized as an admin' });
    return;
  }

  if (currentRound) {
    res.status(400).json({ message: 'A round is already in progress' });
    return;
  }

  currentRound = {
    startTime: new Date(),
    memes: [], // Memes submitted in this round
  };

  // Clear all existing memes for a new round
  await Meme.deleteMany({});

  // Set a timer for the round (e.g., 5 minutes)
  roundTimer = setTimeout(() => {
    endRound(req, res); // Automatically end the round after the timer
  }, 5 * 60 * 1000); // 5 minutes in milliseconds

  res.status(200).json({ message: 'Round started', currentRound });
};

const endRound = async (req, res) => {
  if (req.user.role !== 'admin' && !roundTimer) {
    res.status(403).json({ message: 'Not authorized or no round in progress' });
    return;
  }

  clearTimeout(roundTimer);
  roundTimer = null;

  // Determine the winner of the round
  const winner = await Meme.aggregate([
    { $unwind: '$votes' },
    {
      $group: {
        _id: '$_id',
        caption: { $first: '$caption' },
        imageUrl: { $first: '$imageUrl' },
        voteCount: { $sum: 1 },
      },
    },
    { $sort: { voteCount: -1 } },
    { $limit: 1 },
  ]);

  // Store round history (not implemented yet)

  const roundResult = {
    endTime: new Date(),
    winner: winner[0] || null,
  };

  currentRound = null; // Reset current round

  if (res) {
    res.status(200).json({ message: 'Round ended', roundResult });
  }
};

const getWinner = async (req, res) => {
  // This function would typically return the winner of the *last* round
  // For now, it can return the current top meme if a round is in progress
  const topMeme = await Meme.aggregate([
    { $unwind: '$votes' },
    {
      $group: {
        _id: '$_id',
        caption: { $first: '$caption' },
        imageUrl: { $first: '$imageUrl' },
        voteCount: { $sum: 1 },
      },
    },
    { $sort: { voteCount: -1 } },
    { $limit: 1 },
  ]);
  res.json(topMeme[0] || null);
};

module.exports = { startRound, endRound, getWinner };
