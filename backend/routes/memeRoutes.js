
const express = require('express');
const router = express.Router();
const { uploadMeme, getMemes, voteMeme, deleteMeme } = require('../controllers/memeController');
const { upload } = require('../config/upload');

router.route('/').get(getMemes).post(uploadMeme);
router.route('/:id').delete(deleteMeme);
router.route('/:id/vote').put(voteMeme);

module.exports = router;
