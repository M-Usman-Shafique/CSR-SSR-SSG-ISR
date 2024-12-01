// src/app/page.js
"use client";
import { useEffect, useState } from "react";
import CreatePost from "@/components/CreatePost";
import DisplayPosts from "@/components/DisplayPosts";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get("/api/posts");
      setPosts(response.data.posts || []);
    } catch (error) {
      console.warn(error.response?.data?.message || "Error fetching posts");
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };
  return (
    <div className="flex flex-col justify-center items-center my-5">
      <CreatePost appendNewPost={handleNewPost} />
      <DisplayPosts posts={posts} />
    </div>
  );
}
