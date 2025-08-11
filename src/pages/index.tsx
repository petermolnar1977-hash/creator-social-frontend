import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import PostForm from "@/components/PostForm";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
// ...
const { user } = useAuth();
// ...
{user && <PostForm />}
{!user && <p className="text-center text-gray-600 mt-4">Please log in to create posts.</p>}

interface Post {
  id: string;
  author: { id: string; name: string; avatarUrl?: string };
  content?: string;
  mediaUrl?: string;
  type: string;
  createdAt: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/posts/feed");
      setPosts(res.data);
    } catch (err) {
      alert("Error loading posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto mt-6">
        <PostForm />
        {loading && <p>Loading posts...</p>}
        {!loading && posts.length === 0 && <p>No posts yet.</p>}
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </>
  );
}
