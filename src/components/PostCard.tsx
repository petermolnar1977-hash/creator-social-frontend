interface Post {
  id: string;
  author: { id: string; name: string; avatarUrl?: string };
  content?: string;
  mediaUrl?: string;
  type: string;
  createdAt: string;
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="font-semibold">{post.author.name}</div>
      <div className="text-sm text-gray-500 mb-2">{new Date(post.createdAt).toLocaleString()}</div>
      {post.content && <p className="mb-2">{post.content}</p>}
      {post.mediaUrl && post.type === "image" && (
        <img src={post.mediaUrl} alt="" className="rounded-lg max-h-80 object-cover" />
      )}
      {post.mediaUrl && post.type === "video" && (
        <video controls className="rounded-lg max-h-80">
          <source src={post.mediaUrl} />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
