
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    default: 'https://www.gravatar.com/avatar/?d=identicon', // Default Gravatar identicon
  },
  bio: {
    type: String,
    default: '',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
