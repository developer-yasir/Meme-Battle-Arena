
const express = require('express');
const router = express.Router();
const { uploadMeme, getMemes, voteMeme, deleteMeme, addComment, getComments, getMemeKing } = require('../controllers/memeController');

router.route('/').get(getMemes).post(uploadMeme);
router.route('/:id').delete(deleteMeme);
router.route('/:id/vote').put(voteMeme);

router.route('/:memeId/comments').post(addComment).get(getComments); // New comment routes
router.get('/king', getMemeKing); // New Meme King route

module.exports = router;
