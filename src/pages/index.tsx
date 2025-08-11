import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Post {
  id: string;
  author: string;
  content: string;
  mediaUrl?: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await api.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    }
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-6 space-y-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
