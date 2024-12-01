// src/models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    caption: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
