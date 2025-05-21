import express from "express";
import User from "../models/User.js";
import { getUserProfile } from "../controllers/userController.js";

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

router.get("/:id", getUserProfile);

// Follow user
router.put("/follow/:id", async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.body.currentUserId;

    if (targetUserId === currentUserId) {
      return res.status(400).json({ error: "You can't follow yourself" });
    }

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser || !currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!targetUser.followers.includes(currentUserId)) {
      targetUser.followers.push(currentUserId);
      currentUser.following.push(targetUserId);

      await targetUser.save();
      await currentUser.save();

      res.status(200).json({ message: "User followed" });
    } else {
      res.status(400).json({ error: "Already following" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Unfollow user
router.put("/unfollow/:id", async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.body.currentUserId;

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser || !currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (targetUser.followers.includes(currentUserId)) {
      targetUser.followers = targetUser.followers.filter(
        (id) => id.toString() !== currentUserId
      );
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== targetUserId
      );

      await targetUser.save();
      await currentUser.save();

      res.status(200).json({ message: "User unfollowed" });
    } else {
      res.status(400).json({ error: "Not currently following" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
