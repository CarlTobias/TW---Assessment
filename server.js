import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";

import User from "./backend/models/User.js";
import postRoutes from "./backend/routes/Posts.js";
import uploadRoutes from "./backend/routes/Uploads.js";
import userRoutes from "./backend/routes/Users.js";
import commentRoutes from "./backend/routes/Comments.js";

dotenv.config();
const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "dist")));


// Middleware
app.use(express.json());

// Running both frontend and backend simultaneously
app.use(
  cors({
    origin: ["http://localhost:5173", "https://woofles.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Setting up Mongoose
mongoose
  .connect(process.env.WOOFLESDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Register
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ error: "User already exists with this email." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ message: "User Registered Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User Not Found." });

    const isPasswordsMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordsMatch)
      return res.status(400).json({ error: "Incorrect Password." });

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        profilePic: user.profilePic,
        followers: user.followers,
        following: user.following,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login Failed" });
  }
});

// Routes
app.use("/api/upload", uploadRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comments", commentRoutes);


app.listen(3000, () => {
  console.log("Server running on port 3000");
});