import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.get(`/posts/${id}`)
      .then(res => setPost(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="py-16 text-center">Loading...</div>;
  if (!post) return <div className="py-16 text-center">Post not found</div>;

  const imageUrl = post.featuredImage ? `${import.meta.env.VITE_API_URL?.replace('/api','') || ''}${post.featuredImage}` : null;

  return (
    <article className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-sm text-slate-500 mb-4">{new Date(post.createdAt).toLocaleDateString()} • {post.category?.name}</div>
      {imageUrl && <img src={imageUrl} alt={post.title} className="w-full rounded-md mb-6 object-cover max-h-96" />}
      <div className="prose max-w-none">
        <p>{post.content}</p>
      </div>

      <div className="mt-6 flex gap-3">
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-slate-100 rounded">Back</button>
      </div>
    </article>
  );
}
