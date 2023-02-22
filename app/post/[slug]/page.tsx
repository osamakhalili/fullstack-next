"use client";

import Post from "../../Post";
import AddComment from "../../AddComment";
import Image from "next/image";
import { useQuery } from "react-query";
import axios from "axios";
import { PostType } from "../../types/drivingSession";
import { motion } from "framer-motion";

type URL = {
  params: {
    slug: string;
  };
  searchParams: string;
};
//Fetch All posts
const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery<PostType>({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });
  if (isLoading) return "Loading";
  console.log(data);
  return (
    <div>
      <Post
        id={data?.id}
        name={data?.user.name}
        avatar={data?.user.image}
        postTitle={data?.title}
      />
    </div>
  );
}
