import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/suggested/:id", async (req, res) => {
  try {
    const currentUserId = req.params.id;

    const suggestedUsers = await User.find({ _id: { $ne: currentUserId } })
      .select("username profilePic followers")
      .limit(3);

    res.json(suggestedUsers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch suggested users." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
