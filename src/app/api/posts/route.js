// src/app/api/posts/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/configs/mongodb";
import { Post } from "@/models/Post";

export async function GET() {
  await dbConnect();

  try {
    const posts = await Post.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      {
        success: true,
        message: posts.length ? "Posts fetched successfully" : "No posts found",
        posts: posts.length ? posts : [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch posts",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  const caption = body.caption;

  try {
    if (
      !caption ||
      typeof caption !== "string" ||
      caption.trim().length === 0
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid caption" },
        { status: 400 }
      );
    }

    const newPost = new Post({
      caption: caption.trim(),
    });

    await newPost.save();

    return NextResponse.json(
      {
        success: true,
        message: "Post created successfully",
        post: newPost,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST handler:", error.message);
    return NextResponse.json(
      { success: false, message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
