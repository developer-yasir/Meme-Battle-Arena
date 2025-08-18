
const User = require('../models/User');
const Meme = require('../models/Meme'); // Import Meme model

const registerUsername = async (req, res) => {
  const { username } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      user = await User.create({ username });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkUsernameAvailability = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (user) {
      res.json({ available: false });
    } else {
      res.json({ available: true });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

const banUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    // Implement ban logic here (e.g., add a 'isBanned' field to User model)
    res.json({ message: `User ${user.username} banned` });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const muteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    // Implement mute logic here (e.g., add a 'isMuted' field to User model)
    res.json({ message: `User ${user.username} muted` });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Meme.aggregate([
      { $unwind: '$votes' }, // Deconstruct the votes array
      { $group: { _id: '$user', totalVotes: { $sum: 1 } } }, // Group by user and count votes
      { $sort: { totalVotes: -1 } }, // Sort by total votes descending
      { $limit: 10 }, // Limit to top 10 users
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } }, // Join with users collection
      { $unwind: '$user' }, // Deconstruct the user array
      { $project: { _id: 0, username: '$user.username', avatar: '$user.avatar', totalVotes: 1 } }, // Project desired fields
    ]);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userMemes = await Meme.find({ user: user._id }).sort({ createdAt: -1 });

    let totalVotesOnUserMemes = 0;
    userMemes.forEach(meme => {
      totalVotesOnUserMemes += meme.votes.length;
    });

    res.json({
      _id: user._id,
      username: user.username,
      avatar: user.avatar,
      bio: user.bio, // Include bio
      memes: userMemes,
      totalVotes: totalVotesOnUserMemes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const { bio, avatar } = req.body; // Allow updating bio and avatar

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (bio !== undefined) {
      user.bio = bio;
    }
    if (avatar !== undefined) {
      user.avatar = avatar;
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUsername, checkUsernameAvailability, getUsers, banUser, muteUser, getLeaderboard, getUserProfile, updateUserProfile };
