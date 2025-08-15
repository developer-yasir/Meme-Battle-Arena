
const User = require('../models/User');

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

module.exports = { registerUsername, checkUsernameAvailability, getUsers, banUser, muteUser };
