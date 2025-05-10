import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,

  bio: { type: String, default: "" },
  profilePic: {
    type: String,
    default: "insert image placeholder here",
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}); // Added the other things needed for the model

const User = mongoose.model("User", userSchema, "users");

export default User;
