
const express = require('express');
const router = express.Router();
const { getMemesPerDay, getMostVotedMeme, getActiveUsersPerRound } = require('../controllers/analyticsController');

router.route('/memes-per-day').get(getMemesPerDay);
router.route('/most-voted-meme').get(getMostVotedMeme);
router.route('/active-users-per-round').get(getActiveUsersPerRound);

module.exports = router;
