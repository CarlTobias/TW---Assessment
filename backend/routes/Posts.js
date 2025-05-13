import express from "express";
import upload from "../middleware/upload.js";
import cloudinary from "../utils/cloudinary.js";
import Post from "../models/Post.js";

const router = express.Router();

// Route for uploading image
router.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    const { caption, userId } = req.body;

    // Upload image to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);

    // Create new post with the uploaded image URL
    const newPost = new Post({
      imageUrl: cloudinaryResult.secure_url,
      caption,
      user: userId,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong uploading the post" });
  }
});

export default router;
