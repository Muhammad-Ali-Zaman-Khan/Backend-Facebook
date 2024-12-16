import express from "express";
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from "../controllers/post.controllers.js";

const router = express.Router();

router.post('/post', createPost);
router.get('/post', getAllPosts);
router.get('/post/:id', getPostById);
router.put('/post/:id', updatePost);
router.delete('/post/:id', deletePost);

export default router;
