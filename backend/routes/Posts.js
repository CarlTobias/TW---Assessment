import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// Route to get all posts (or posts by a specific user)
router.get("/api/posts", async (req, res) => {
  try {
    const { userId } = req.query; // If you want to filter by user ID

    let posts;
    if (userId) {
      // Fetch posts for a specific user, sorted by createdAt in descending order
      posts = await Post.find({ user: userId }).sort({ createdAt: -1 });
    } else {
      // Fetch all posts, sorted by createdAt in descending order
      posts = await Post.find().sort({ createdAt: -1 });
    }

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong fetching the posts" });
  }
});

export default router;
