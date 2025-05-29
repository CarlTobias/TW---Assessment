import express from "express";
import Comment from "../models/commentModel.js";
import User from "../models/userModel.js";

const router = express.Router();

// GET comments for a specific post
router.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ postId })
      .sort({ createdAt: -1 })
      .populate("userId", "username profilePic");

    res.status(200).json(comments);
  } catch (err) {
    console.error("Get comments error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST a comment for a specific post
router.post("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, text } = req.body;

    if (!userId || !text) {
      return res.status(400).json({ message: "Missing userId or text" });
    }

    const user = await User.findById(userId).select("username profilePic");
    if (!user) return res.status(404).json({ message: "User not found" });

    const comment = await Comment.create({
      postId,
      userId,
      username: user.username,
      text,
    });

    res.status(201).json({ message: "Comment added", comment });
  } catch (err) {
    console.error("Add comment error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
