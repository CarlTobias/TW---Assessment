import express from "express";
import cloudinary from "../config/cloudinary.js";
import upload from "../middleware/upload.js";
import Post from "../models/Post.js";

const router = express.Router();

// Helper function to upload from buffer
const streamUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "woofles/posts" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    stream.end(fileBuffer);
  });
};

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { caption, userId } = req.body;

    if (!caption || !userId) {
      return res.status(400).json({ error: "Caption and userId are required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    const result = await streamUpload(req.file.buffer);

    const newPost = new Post({
      imageUrl: result.secure_url,
      caption,
      user: userId,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Something went wrong uploading the post" });
  }
});


router.post("/profile-pic", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    const result = await streamUpload(req.file.buffer);
    res.status(201).json({ imageUrl: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload profile picture" });
  }
});


export default router;