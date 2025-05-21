import User from "../models/User.js";
import Post from "../models/Post.js";

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("followers")
      .populate("following")
      .lean();

    if (!user) return res.status(404).json({ error: "User not found" });

    console.log("User _id:", user._id);

    const postCount = await Post.countDocuments({ user: user._id });
    console.log("Post count:", postCount);

    const posts = await Post.find({ user: user._id });
    console.log("Posts found:", posts.length);

    res.status(200).json({
      ...user,
      postsCount: postCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
  
export default getUserProfile;