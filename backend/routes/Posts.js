import express from "express";
import mongoose from "mongoose";
import Post from "../models/Post.js";

const router = express.Router();

// Route to get all posts (or posts by a specific user)
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    console.log("Fetching posts. userId:", userId);

    let posts;
    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      posts = await Post.find({ user: userId })
        .populate("user", "username profilePic")
        .sort({ createdAt: -1 });
    } else {
      posts = await Post.find({})
        .populate("user", "username profilePic")
        .sort({ createdAt: -1 });
    }
    

    console.log("Fetched posts:", posts.length);
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error in GET /api/posts:", err);
    res.status(500).json({ error: "Something went wrong fetching the posts" });
  }
});


// DELETE: Erase a post and its data from the database
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
