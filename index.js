import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/db/index.js";

import userRoutes from "./src/routes/user.routes.js"
import postRoutes from "./src/routes/post.routes.js"
import commentRoutes from "./src/routes/comment.routes.js" 

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use("/api/v1", userRoutes); 
app.use("/api/v1", postRoutes); 
app.use("/api/v1", commentRoutes); 

// Test Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Database Connection and Server Start
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚙️  Server is running at port: ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MONGO DB connection failed: ", err);
  });
