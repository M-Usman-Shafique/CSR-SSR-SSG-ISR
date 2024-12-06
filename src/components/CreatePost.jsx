// src/components/CreatePost.jsx
"use client";
import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createPost = async (newPost) => {
  const response = await axios.post("/api/posts", newPost);
  return response.data;
};

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["posts"]);
      setMessage("Post created successfully!");
      setCaption("");
    },
    onError: (error) => {
      setMessage(error.response?.data?.message || "Error creating post");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ caption });
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
    if (message) setMessage("");
  };

  return (
    <div className="w-1/3 bg-gray-700 p-6 rounded-lg shadow-md text-white">
      <h2 className="text-xl font-bold mb-4 text-center">Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={handleCaptionChange}
            className="w-full p-2 rounded bg-gray-600 text-gray-100"
            placeholder="What's on your mind?"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium"
        >
          Create Post
        </button>
      </form>
      {message && (
        <p className="mt-4 text-sm text-green-400 text-center">{message}</p>
      )}
    </div>
  );
}
