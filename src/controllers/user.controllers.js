import User from "../models/user.model.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// GENERATE ACCESS AND REFRESH TOKEN

const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_JWT_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_JWT_SECRET, { expiresIn: "7d" });
};


// register user


const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
      return res.status(400).json({ message: "Username is required" });
  }
  if (!email) {
      return res.status(400).json({ message: "Email is required" });
  }
  if (!password) {
      return res.status(400).json({ message: "Password is required" });
  }

  try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(409).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
          username,
          email,
          password: hashedPassword,
      });

      return res.status(201).json({
          message: "User registered successfully",
          data: {
              id: newUser._id,
              username: newUser.username,
              email: newUser.email,
          },
      });
  } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
};


// login user


const loginUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email) {
      return res.status(400).json({ message: "Either username or email is required" });
  }
  if (!password) {
      return res.status(400).json({ message: "Password is required" });
  }

  try {
      const user = await User.findOne({
          $or: [{ email }, { username }],
      });

      if (!user) {
          return res.status(404).json({ message: "No user found" });
      }

      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, 
      });

      res.json({
          message: "User logged in successfully",
          accessToken,
          data: {
              id: user._id,
              username: user.username,
              email: user.email,
          },
      });
  } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};



// logout user

const logoutUser = async (req , res) => {
  res.clearCookie("refreshToken");
  res.json({
  message: "User LogOut SuccessFully"
  });
};











// Create a new user
const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user)
      return res.status(404).json({
        message: 'User not found',
      });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).json({
        message: 'User not found',
      });
    res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


// refreshtoken
const refreshToken = async (req, res) => {
  try {
      const token = req.cookies.refreshToken || req.body.refreshToken;
      if (!token) {
          return res.status(401).json({
              message: "No Refresh Token Found!",
          });
      }
      const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      const user = await User.findOne({ _id: decodedToken.id });
      if (!user) {
          return res.status(404).json({
              message: "Invalid Token",
          });
      }

      const newAccessToken = generateAccessToken(user._id);

      res.json({
          message: "Access Token Generated",
          accessToken: newAccessToken,
      });
  } catch (error) {
      console.error("Error refreshing token:", error);

      if (error.name === "TokenExpiredError") {
          return res.status(403).json({ message: "Refresh token expired" });
      }
      if (error.name === "JsonWebTokenError") {
          return res.status(403).json({ message: "Invalid refresh token" });
      }
      res.status(500).json({
          message: "Internal server error",
      });
  }
};



export {createUser , getAllUsers , getUserById , updateUser , deleteUser , registerUser , loginUser , logoutUser , refreshToken};