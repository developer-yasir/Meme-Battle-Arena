const mongoose = require('mongoose');

const memeKingSchema = new mongoose.Schema({
  meme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meme',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
    unique: true, // Ensure only one Meme King per day
  },
  totalVotes: {
    type: Number,
    required: true,
  },
});

const MemeKing = mongoose.model('MemeKing', memeKingSchema);

module.exports = MemeKing;