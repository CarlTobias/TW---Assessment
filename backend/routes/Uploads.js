import fs from "fs";
import express from "express";
import cloudinary from "../config/cloudinary.js";
import upload from "../middleware/upload.js";
import Post from "../models/Post.js";

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { caption, userId } = req.body;

    // Upload image to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);

    // Delete the local file to save storage
    fs.unlinkSync(req.file.path);

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

router.post("/profile-pic", upload.single("image"), async (req, res) => {
  try {
    // Upload image to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);

    // Delete local file
    fs.unlinkSync(req.file.path);

    // Return only the image URL (no post creation)
    res.status(201).json({ imageUrl: cloudinaryResult.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload profile picture" });
  }
});

export default router;
