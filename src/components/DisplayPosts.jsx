// src/components/DisplayPosts.jsx
export default function DisplayPosts({ posts }) {
  return (
    <>
      {posts.length > 0 ? (
        <div className="w-full px-16 py-4 rounded-lg shadow-md mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
          {posts.map((post) => (
            <div
              key={post._id}
              className="p-4 bg-gray-700 rounded border border-gray-600"
            >
              <p className="text-lg">{post.caption}</p>
              <span className="text-sm text-gray-400">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
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
