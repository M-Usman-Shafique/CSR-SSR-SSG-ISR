"use client";
import { useState } from "react";
import axios from "axios";

export default function CreatePost({ onPostCreated }) {
  const [caption, setCaption] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/posts", { caption });
    //   console.log(response);
      setMessage(response.data.message);
      setCaption("");

      if (response.data.success && onPostCreated) {
        onPostCreated(response.data.post);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating post");
    }
  };

  return (
    <div className="w-1/3 bg-gray-800 p-6 rounded-lg shadow-md text-white">
      <h2 className="text-xl font-bold mb-4 text-center">Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-gray-100"
            placeholder="What's on your mind?"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium"
        >
          Submit
        </button>
      </form>
      {message && (
        <p className="mt-4 text-sm text-green-400 text-center">{message}</p>
      )}
    </div>
  );
}
