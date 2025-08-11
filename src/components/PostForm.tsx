import { useState } from "react";
import api from "@/lib/api";

export default function PostForm() {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [type, setType] = useState("blog");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content && !media) {
      alert("Please add content or media");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("type", type);
    if (media) formData.append("media", media);

    setLoading(true);
    try {
      await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Post created!");
      setContent("");
      setMedia(null);
      setType("blog");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <textarea
        placeholder="Write your post content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        className="w-full border p-2 rounded mb-2"
      />
      <div className="flex items-center space-x-4 mb-2">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded p-2"
        >
          <option value="blog">Blog</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
        <input
          type="file"
          accept={type === "image" ? "image/*" : type === "video" ? "video/*" : ""}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setMedia(e.target.files[0]);
            }
          }}
          disabled={type === "blog"}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
