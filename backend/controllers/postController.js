import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { content, image } = req.body;

  const post = await Post.create({
    user: req.user._id,
    content,
    image,
  });

  const populatedPost = await Post.findById(post._id).populate('user', 'username profilePicture');

  res.status(201).json(populatedPost);
});

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .populate('user', 'username profilePicture')
    .populate('comments.user', 'username profilePicture')
    .sort({ createdAt: -1 });

  res.json(posts);
});

// @desc    Get user posts
// @route   GET /api/posts/user/:userId
// @access  Private
const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.params.userId })
    .populate('user', 'username profilePicture')
    .populate('comments.user', 'username profilePicture')
    .sort({ createdAt: -1 });

  res.json(posts);
});

// @desc    Like/Unlike a post
// @route   PUT /api/posts/:id/like
// @access  Private
const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  const isLiked = post.likes.includes(req.user._id);

  if (isLiked) {
    // Unlike
    await Post.findByIdAndUpdate(req.params.id, {
      $pull: { likes: req.user._id },
    });
    res.json({ message: 'Post unliked' });
  } else {
    // Like
    await Post.findByIdAndUpdate(req.params.id, {
      $push: { likes: req.user._id },
    });
    res.json({ message: 'Post liked' });
  }
});

// @desc    Comment on a post
// @route   POST /api/posts/:id/comments
// @access  Private
const commentOnPost = asyncHandler(async (req, res) => {
  const { content } = req.body;

  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  const comment = {
    user: req.user._id,
    content,
  };

  post.comments.push(comment);
  await post.save();

  const updatedPost = await Post.findById(req.params.id)
    .populate('user', 'username profilePicture')
    .populate('comments.user', 'username profilePicture');

  res.status(201).json(updatedPost);
});

export { createPost, getPosts, getUserPosts, likePost, commentOnPost };