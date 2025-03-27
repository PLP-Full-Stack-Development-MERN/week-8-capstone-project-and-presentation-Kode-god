const express = require('express');
const router = express.Router();
const { getCurrentUser, getUserProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/me', auth, getCurrentUser);
router.get('/:id', auth, getUserProfile);

module.exports = router;
