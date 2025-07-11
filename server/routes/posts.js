// routes/posts.js - Posts routes for the blog application
const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// GET /api/posts - Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('category', 'name')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/posts/:id - Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('category', 'name');
    
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /api/posts - Create new post
router.post('/', async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    
    const post = new Post({
      title,
      content,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    });
    
    const savedPost = await post.save();
    await savedPost.populate('category', 'name');
    
    res.status(201).json({
      success: true,
      data: savedPost
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// PUT /api/posts/:id - Update post
router.put('/:id', async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        category,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    ).populate('category', 'name');
    
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE /api/posts/:id - Delete post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;