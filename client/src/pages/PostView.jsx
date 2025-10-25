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
    console.log('Fetching post with ID:', id);
    api.get(`/posts/${id}`)
      .then(res => {
        console.log('Post data received:', res.data);
        setPost(res.data.data);
      })
      .catch(err => {
        console.error('Error fetching post:', err);
        setError(err.response?.data?.message || 'Failed to load post');
        setPost(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-600 dark:border-brand-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="text-content-muted dark:text-gray-400">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 text-content-main dark:text-gray-100 bg-brand-50 dark:bg-gray-700 hover:bg-brand-100 dark:hover:bg-gray-600 rounded-md transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-16 text-center">
        <p className="text-content-muted dark:text-gray-400">Post not found</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 text-content-main dark:text-gray-100 bg-brand-50 dark:bg-gray-700 hover:bg-brand-100 dark:hover:bg-gray-600 rounded-md transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const imageUrl = post.featuredImage ? `${import.meta.env.VITE_API_URL?.replace('/api','') || 'http://localhost:5000'}${post.featuredImage}` : null;
  const createdAt = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  return (
    <article className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md dark:shadow-lg">
      <h1 className="text-3xl font-bold text-content-dark dark:text-gray-100 mb-4">{post.title}</h1>
      <div className="flex items-center gap-2 text-sm text-content-muted dark:text-gray-400 mb-4">
        <span>{createdAt}</span>
        {post.category && (
          <>
            <span>•</span>
            <span className="text-brand-600 dark:text-brand-400">{post.category.name}</span>
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

      {post.excerpt && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-content-main dark:text-gray-100 italic">"{post.excerpt}"</p>
        </div>
      )}

      <div className="prose max-w-none mb-8">
        <div className="text-content-main dark:text-gray-100 whitespace-pre-wrap">{post.content}</div>
      </div>

      <div className="mt-8 flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-content-main dark:text-gray-100 bg-brand-50 dark:bg-gray-700 hover:bg-brand-100 dark:hover:bg-gray-600 rounded-md transition-colors"
        >
          Back to Posts
        </button>
      </div>
    </article>
  );
}
