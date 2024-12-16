import express from "express"
import { createComment, getCommentsByPost, deleteComment } from '../controllers/commentController.js';

const router = express.Router();

router.post('/', createComment);
router.get('/post/:postId', getCommentsByPost);
router.delete('/:id', deleteComment);

export default router;
