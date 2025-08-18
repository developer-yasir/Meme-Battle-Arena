const Poll = require('../models/Poll');

// @desc    Create a new poll
// @route   POST /api/polls
// @access  Private (admin only)
const createPoll = async (req, res) => {
  try {
    const { question, options, expiresAt } = req.body;

    // Basic validation
    if (!question || !options || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ message: 'Please provide a question and at least two options.' });
    }

    const poll = await Poll.create({ question, options, expiresAt });
    res.status(201).json(poll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get the currently active poll
// @route   GET /api/polls/active
// @access  Public
const getActivePoll = async (req, res) => {
  try {
    const poll = await Poll.findOne({ active: true, expiresAt: { $gte: new Date() } }).sort({ createdAt: -1 });

    if (!poll) {
      return res.status(404).json({ message: 'No active poll found.' });
    }

    res.json(poll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Vote on a poll option
// @route   POST /api/polls/:id/vote
// @access  Public
const votePoll = async (req, res) => {
  try {
    const { id } = req.params;
    const { optionIndex } = req.body;

    const poll = await Poll.findById(id);

    if (!poll) {
      return res.status(404).json({ message: 'Poll not found.' });
    }

    if (poll.expiresAt && poll.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Poll has expired.' });
    }

    if (optionIndex === undefined || optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ message: 'Invalid option index.' });
    }

    poll.options[optionIndex].votes += 1;
    await poll.save();

    res.json(poll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createPoll,
  getActivePoll,
  votePoll,
};
