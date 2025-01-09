import express from "express";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, registerUser, loginUser, logoutUser, refreshToken } from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.post("/logout" , logoutUser);
router.post("/refreshtoken" , refreshToken);
router.post('/user', createUser);
router.get('/user', getAllUsers);
router.get('/user/:id', getUserById);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;
