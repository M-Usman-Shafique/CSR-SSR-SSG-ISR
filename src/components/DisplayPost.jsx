// src/components/DisplayPost.jsx
"use client";
import { HydrationBoundary, useQuery } from "@tanstack/react-query";

export default function DisplayPost({ postId, dehydratedState }) {
  return (
    <div className="p-4 bg-gray-700 rounded border border-gray-600 mt-10">
      <HydrationBoundary state={dehydratedState}>
        <PostCard postId={postId} />
      </HydrationBoundary>
    </div>
  );
}

function PostCard({ postId }) {
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", postId],
    enabled: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading post</div>;
  return (
    <>
      <h1 className="text-2xl font-bold mb-2">{post.caption}</h1>
      <p className="text-sm text-gray-400">
        {new Date(post.createdAt).toLocaleString()}
      </p>
    </>
  );
}
