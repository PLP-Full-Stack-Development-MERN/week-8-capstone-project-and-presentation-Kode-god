import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  getUserProfileById,
  followUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get('/profile/:id', protect, getUserProfileById);
router.put('/:id/follow', protect, followUser);

export default router;