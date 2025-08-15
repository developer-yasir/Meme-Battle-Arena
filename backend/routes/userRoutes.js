
const express = require('express');
const router = express.Router();
const { registerUsername, checkUsernameAvailability, getUsers, banUser, muteUser } = require('../controllers/userController');

router.route('/').get(getUsers);
router.post('/register-username', registerUsername);
router.get('/check-username/:username', checkUsernameAvailability);
router.route('/:id/ban').put(banUser);
router.route('/:id/mute').put(muteUser);

module.exports = router;
