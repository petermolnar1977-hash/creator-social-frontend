interface Post {
  id: number;
  author: string;
  content: string;
  mediaUrl?: string;
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="font-semibold">{post.author}</h2>
      <p className="mt-2">{post.content}</p>
      {post.mediaUrl && (
        <img src={post.mediaUrl} alt="" className="mt-4 rounded-lg" />
      )}
    </div>
  );
}
