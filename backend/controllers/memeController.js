
const Meme = require('../models/Meme');
const User = require('../models/User');
const Comment = require('../models/Comment'); // Import Comment model
const MemeKing = require('../models/MemeKing'); // Import MemeKing model

const uploadMeme = async (req, res) => {
  const { description, username } = req.body; // Get username from req.body

  try {
    let user = await User.findOne({ username }); // Find or create user based on provided username
    if (!user) {
      user = await User.create({ username });
    }

    const meme = await Meme.create({
      user: user._id,
      text: description,
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

const addComment = async (req, res) => {
  const { memeId } = req.params;
  const { text, username } = req.body;

  try {
    const meme = await Meme.findById(memeId);
    if (!meme) {
      return res.status(404).json({ message: 'Meme not found' });
    }

    let user = await User.findOne({ username });
    if (!user) {
      user = await User.create({ username });
    }

    const comment = await Comment.create({
      text,
      user: user._id,
      meme: meme._id,
    });

    const populatedComment = await comment.populate('user', 'username avatar');

    req.io.emit('newComment', populatedComment); // Emit new comment for real-time updates

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getComments = async (req, res) => {
  const { memeId } = req.params;
  try {
    const comments = await Comment.find({ meme: memeId })
      .populate('user', 'username avatar')
      .sort({ createdAt: 1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMemeKing = async (req, res) => {
  try {
    const memeKing = await MemeKing.findOne()
      .sort({ date: -1 }) // Get the latest Meme King
      .populate('meme', 'text') // Populate meme text
      .populate('user', 'username avatar'); // Populate user details

    if (!memeKing) {
      return res.status(404).json({ message: 'No Meme King found yet.' });
    }

    res.json(memeKing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadMeme, getMemes, voteMeme, deleteMeme, addComment, getComments, getMemeKing };
