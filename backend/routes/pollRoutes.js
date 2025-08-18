const express = require('express');
const router = express.Router();
const { createPoll, getActivePoll, votePoll } = require('../controllers/pollController');

router.route('/').post(createPoll);
router.route('/active').get(getActivePoll);
router.route('/:id/vote').post(votePoll);

module.exports = router;
