// src/app/api/posts/[postId]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/configs/mongodb";
import { Post } from "@/models/Post";

export async function GET(req, { params }) {
  const { postId } = await params;

  if (!postId) {
    return NextResponse.json(
      { success: false, message: "Post ID isn't provided." },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, message: "Post fetched successfully", post },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching post:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch post",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
