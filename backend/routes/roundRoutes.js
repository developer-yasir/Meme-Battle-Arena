
const express = require('express');
const router = express.Router();
const { startRound, endRound, getWinner } = require('../controllers/roundController');

router.route('/start').post(startRound);
router.route('/end').post(endRound);
router.route('/winner').get(getWinner);

module.exports = router;
