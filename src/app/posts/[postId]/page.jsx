// src/app/posts/[postId]/page.jsx
import axios from "axios";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import DisplayPost from "@/components/DisplayPost";

const getPost = async (id) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`
  );
  return response.data.post || null;
};

export default async function post({ params }) {
  const { postId } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <DisplayPost postId={postId} dehydratedState={dehydratedState} />
    </div>
  );
}
