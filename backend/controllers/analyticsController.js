
const Meme = require('../models/Meme');
const User = require('../models/User');

const getMemesPerDay = async (req, res) => {
  if (req.user.role !== 'admin') {
    res.status(403).json({ message: 'Not authorized as an admin' });
    return;
  }
  const memesPerDay = await Meme.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  res.json(memesPerDay);
};

const getMostVotedMeme = async (req, res) => {
  if (req.user.role !== 'admin') {
    res.status(403).json({ message: 'Not authorized as an admin' });
    return;
  }
  const mostVotedMeme = await Meme.aggregate([
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
  res.json(mostVotedMeme[0]);
};

const getActiveUsersPerRound = async (req, res) => {
  if (req.user.role !== 'admin') {
    res.status(403).json({ message: 'Not authorized as an admin' });
    return;
  }
  // This is a placeholder. Actual implementation would depend on how rounds are defined and tracked.
  // For now, let's return a dummy data or count of users who have voted in the last 24 hours.
  const activeUsers = await User.countDocuments({
    // Assuming a 'lastActivity' field or similar
    // lastActivity: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  });
  res.json({ count: activeUsers });
};

module.exports = { getMemesPerDay, getMostVotedMeme, getActiveUsersPerRound };
