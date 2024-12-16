import Post from "../models/post.model.js";

// Create a new post
const createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('userID');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('userID Comments');
    if (!post)
      return res.status(404).json({
        message: 'Post not found',
      });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Update a post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post)
      return res.status(404).json({
        message: 'Post not found',
      });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post)
      return res.status(404).json({
        message: 'Post not found',
      });
    res.status(200).json({
      message: 'Post deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


export {createPost , getAllPosts , getPostById , updatePost , deletePost}