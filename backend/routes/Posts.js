import express from "express";
import mongoose from "mongoose";
import Post from "../models/Post.js";

const router = express.Router();

// Route to get all posts (or posts by a specific user)
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    let posts;

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      posts = await Post.find({ user: userId })
        .populate("user", "username profilePic")
        .sort({ createdAt: -1 });

    } else {
      posts = await Post.find({ user: userId })
        .populate("user", "username profilePic")
        .sort({ createdAt: -1 });

    }

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong fetching the posts" });
  }
});

// DELETE: Erase a post and its data from the database
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete" });
  }
});

export default router;
