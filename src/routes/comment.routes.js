import express from "express";
import { createComment, getCommentsByPost, deleteComment } from "../controllers/comment.controllers.js";

const router = express.Router();

router.post('/comment', createComment);
router.get('/comment/:postId', getCommentsByPost);
router.delete('/comment/:id', deleteComment);

export default router;
