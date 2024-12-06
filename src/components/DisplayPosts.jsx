// src/components/DisplayPosts.jsx
"use client";
import Link from "next/link";
import { HydrationBoundary, useQuery } from "@tanstack/react-query";

export default function DisplayPosts({ dehydratedState }) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <PostCards />
    </HydrationBoundary>
  );
}

function PostCards() {
  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    enabled: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <>
      {posts.length > 0 ? (
        <div className="w-full px-16 py-4 rounded-lg shadow-md mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
          {posts.map((post) => (
            <Link
              href={`/posts/${post._id}`}
              key={post._id}
              className="p-4 bg-gray-700 rounded border border-gray-600"
            >
              <p className="text-lg">{post.caption}</p>
              <span className="text-sm text-gray-400">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center mt-10">
          <p className="text-gray-500">No posts available</p>
        </div>
      )}
    </>
  );
}
