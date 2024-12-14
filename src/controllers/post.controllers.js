import Post from "../models/post.model.js"

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
    error: error.message 
});
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('userId');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
    error: error.message 
});
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('userId comments');
    if (!post) return res.status(404).json({
    message: 'Post not found' 
});
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
    error: error.message 
});
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({
    message: 'Post not found' 
});
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
    error: error.message 
});
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({
    message: 'Post not found' 
});
    res.status(200).json({
    message: 'Post deleted successfully' 
});
  } catch (error) {
    res.status(500).json({
    error: error.message 
});
  }
};
