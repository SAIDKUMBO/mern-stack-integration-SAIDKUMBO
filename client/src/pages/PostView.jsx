import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import api from '../services/api';
import CommentSection from '../components/CommentSection';

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.get(`/posts/${id}`)
      .then(res => setPost(res.data.data))
      .catch(err => {
        setError(err.response?.data?.message || 'Failed to load post');
        setPost(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="text-content-muted">{error}</p>
        <button 
          onClick={() => navigate(-1)} 
          className="mt-4 px-4 py-2 text-content-main bg-brand-50 hover:bg-brand-100 rounded-md transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-16 text-center">
        <p className="text-content-muted">Post not found</p>
        <button 
          onClick={() => navigate(-1)} 
          className="mt-4 px-4 py-2 text-content-main bg-brand-50 hover:bg-brand-100 rounded-md transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const imageUrl = post.featuredImage ? `${import.meta.env.VITE_API_URL?.replace('/api','') || ''}${post.featuredImage}` : null;
  const createdAt = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  return (
    <article className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-content-dark mb-4">{post.title}</h1>
      <div className="flex items-center gap-2 text-sm text-content-muted mb-4">
        <span>{createdAt}</span>
        {post.category && (
          <>
            <span>•</span>
            <span className="text-brand-600">{post.category.name}</span>
          </>
        )}
      </div>

      {imageUrl && (
        <div className="relative w-full h-64 md:h-96 mb-6">
          <img 
            src={imageUrl} 
            alt={post.title} 
            className="w-full h-full rounded-md object-cover"
          />
        </div>
      )}

      <div className="prose max-w-none mb-8">
        <div className="text-content-main whitespace-pre-wrap">{post.content}</div>
      </div>
      
      <CommentSection postId={post._id} comments={post.comments} />

      <div className="mt-8 flex gap-3">
        <button 
          onClick={() => navigate(-1)} 
          className="px-4 py-2 text-content-main bg-brand-50 hover:bg-brand-100 rounded-md transition-colors"
        >
          Back to Posts
        </button>
      </div>
    </article>
  );
}
