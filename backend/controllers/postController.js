const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const newPost = await Post.create({
      content,
      user: req.user.id
    });
    const post = await Post.findById(newPost._id).populate('user', 'username');
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username')
      .populate('comments.user', 'username')
      .sort('-createdAt');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const userId = req.user.id;
    const likeIndex = post.likes.indexOf(userId);

    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    const comment = {
      user: req.user.id,
      content: req.body.content
    };

    post.comments.push(comment);
    await post.save();
    
    const updatedPost = await Post.findById(post._id)
      .populate('user', 'username')
      .populate('comments.user', 'username');

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
