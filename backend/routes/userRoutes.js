
const express = require('express');
const router = express.Router();
const { registerUsername, checkUsernameAvailability, getUsers, banUser, muteUser, getLeaderboard, getUserProfile, updateUserProfile } = require('../controllers/userController');

router.route('/').get(getUsers);
router.post('/register-username', registerUsername);
router.get('/check-username/:username', checkUsernameAvailability);
router.route('/:id/ban').put(banUser);
router.route('/:id/mute').put(muteUser);
router.get('/leaderboard', getLeaderboard); // New leaderboard route
router.get('/:username', getUserProfile); // New user profile route
router.put('/:username', updateUserProfile); // New update user profile route

module.exports = router;
