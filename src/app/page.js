// src/app/page.js
import { dehydrate, QueryClient } from "@tanstack/react-query";
import CreatePost from "@/components/CreatePost";
import DisplayPosts from "@/components/DisplayPosts";
import axios from "axios";

const getPosts = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts`
  );
  return response.data.posts || [];
};

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex flex-col justify-center items-center my-5">
      <CreatePost />
      <DisplayPosts dehydratedState={dehydratedState} />
    </div>
  );
}
