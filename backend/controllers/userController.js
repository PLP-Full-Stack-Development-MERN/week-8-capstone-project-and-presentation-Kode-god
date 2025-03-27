const User = require('../models/User');

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate({
        path: 'posts',
        select: 'content createdAt likes comments',
        options: { sort: { createdAt: -1 } }
      });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate({
        path: 'posts',
        select: 'content createdAt likes comments',
        options: { sort: { createdAt: -1 } }
      });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
