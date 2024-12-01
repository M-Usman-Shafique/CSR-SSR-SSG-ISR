"use client";
import { useEffect, useState } from "react";
import CreatePost from "@/components/CreatePost";
import DisplayPosts from "@/components/DisplayPosts";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data.posts || []);
      } catch (error) {
        console.warn(error.response?.data?.message || "Error fetching posts");
      }
    };
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };
  return (
    <div className="flex flex-col justify-center items-center my-5">
      <CreatePost onPostCreated={handlePostCreated} />
      <DisplayPosts posts={posts} />
    </div>
  );
}
