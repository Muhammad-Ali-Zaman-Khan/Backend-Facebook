import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/db/index.js";

// import userRoutes from "./src/routes/userRoutes.js"; // Double-check the path
// import postRoutes from "./src/routes/postRoutes.js"; 
import commentRoutes from "./src/routes/comment.routes.js" 

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// app.use("/users", userRoutes); 
// app.use("/posts", postRoutes); 
app.use("/comments", commentRoutes); 

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
