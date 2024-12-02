// src/app/posts/[postId]/page.jsx
"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function post() {
  const [post, setPost] = useState(null);
  const { postId } = useParams();

  const getPost = async (id) => {
    try {
      const response = await axios.get(`/api/posts/${id}`);
      setPost(response.data.post || null);
    } catch (error) {
      console.warn(error.response?.data?.message || "Error fetching post");
    }
  };

  useEffect(() => {
    getPost(postId);
  }, [postId]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {post ? (
        <div className="p-4 bg-gray-700 rounded border border-gray-600 mt-10">
          <h1 className="text-2xl font-bold mb-2">{post.caption}</h1>
          <p className="text-sm text-gray-400">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-10">
          <p className="text-gray-500">Loading...</p>
        </div>
      )}
    </div>
  );
}
