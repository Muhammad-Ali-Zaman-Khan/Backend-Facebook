import Comment from "../models/comment.model.js"

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({
    error: error.message 
});
  }
};

// Get all comments for a post
exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).populate('userId');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
    error: error.message 
});
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({
    message: 'Comment not found' 
});
    res.status(200).json({
    message: 'Comment deleted successfully' 
});
  } catch (error) {
    res.status(500).json({
    error: error.message 
});
  }
};
