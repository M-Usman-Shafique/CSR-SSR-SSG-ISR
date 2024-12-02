// src/app/posts/[postId]/page.jsx
import axios from "axios";

const getPost = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`
    );
    return res.data.post || null;
  } catch (error) {
    console.warn("Error fetching post:", error.message);
    return [];
  }
};

export default async function post({ params }) {
  const { postId } = await params;
  const post = await getPost(postId);

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
