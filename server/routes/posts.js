// routes/posts.js - Posts routes for the blog application

const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('category', 'name')
      .populate('author', 'username') // optional
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('category', 'name')
      .populate('author', 'username');

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST create a new post
router.post('/', async (req, res) => {
  try {
    const { title, content, category, author, tags } = req.body;

    const post = new Post({
      title,
      content,
      category,
      author,
      tags: Array.isArray(tags)
        ? tags
        : tags
        ? tags.split(',').map(tag => tag.trim())
        : [],
    });

    const savedPost = await post.save();
    await savedPost.populate('category', 'name');
    await savedPost.populate('author', 'username');

    res.status(201).json({
      success: true,
      data: savedPost,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// PUT update an existing post
router.put('/:id', async (req, res) => {
  try {
    const { title, content, category, author, tags } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        category,
        author,
        tags: Array.isArray(tags)
          ? tags
          : tags
          ? tags.split(',').map(tag => tag.trim())
          : [],
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    )
      .populate('category', 'name')
      .populate('author', 'username');

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        error: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      data: updatedPost,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// DELETE a post
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        error: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
