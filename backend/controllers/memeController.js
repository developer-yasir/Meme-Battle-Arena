
const Meme = require('../models/Meme');
const User = require('../models/User');

const uploadMeme = async (req, res) => {
  const { description } = req.body; // Using description as the text content

  try {
    // Placeholder for user. In a real app, this would come from authentication (e.g., req.user.id)
    let user = await User.findOne({ username: "defaultUser" });
    if (!user) {
      user = await User.create({ username: "defaultUser" });
    }

    const meme = await Meme.create({
      user: user._id,
      text: description, // Use description as the meme text
    });

    const populatedMeme = await meme.populate('user', 'username');

    req.io.emit('newMeme', populatedMeme);

    res.status(201).json(meme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMemes = async (req, res) => {
  const memes = await Meme.find({}).populate('user', 'username').sort({ createdAt: -1 });
  res.json(memes);
};

const voteMeme = async (req, res) => {
  const { username } = req.body;
  try {
    const meme = await Meme.findById(req.params.id);
    if (!meme) {
      return res.status(404).json({ message: 'Meme not found' });
    }

    let user = await User.findOne({ username });
    if (!user) {
      user = await User.create({ username });
    }

    if (meme.votes.includes(user._id)) {
      return res.status(400).json({ message: 'You have already voted for this meme' });
    }

    meme.votes.push(user._id);
    await meme.save();

    const populatedMeme = await meme.populate('user', 'username');

    req.io.emit('newVote', populatedMeme);

    res.json({ message: 'Vote added' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMeme = async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id);

    if (!meme) {
      return res.status(404).json({ message: 'Meme not found' });
    }

    // No authorization check as per new simplified flow
    await meme.deleteOne(); // Use deleteOne() instead of remove()
    res.json({ message: 'Meme removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadMeme, getMemes, voteMeme, deleteMeme };
