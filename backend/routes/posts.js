const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  toggleLike,
  addComment
} = require('../controllers/postController');
const auth = require('../middleware/auth');

router.post('/', auth, createPost);
router.get('/', auth, getAllPosts);
router.post('/:id/like', auth, toggleLike);
router.post('/:id/comment', auth, addComment);

module.exports = router;
