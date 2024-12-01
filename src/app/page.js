// src/app/page.js
import CreatePost from "@/components/CreatePost";
import DisplayPosts from "@/components/DisplayPosts";
import axios from "axios";
import { Suspense } from "react";

const getPosts = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
    return res.data.posts || [];
  } catch (error) {
    console.warn("Error fetching posts:", error.message);
    return [];
  }
};

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col justify-center items-center my-5">
      <CreatePost />
      <Suspense fallback={<div>Loading...</div>}>
        <DisplayPosts posts={posts} />
      </Suspense>
    </div>
  );
}
