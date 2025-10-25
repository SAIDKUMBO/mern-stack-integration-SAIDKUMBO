import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-hot-toast';
import api from '../services/api';

export default function CommentSection({ postId, comments: initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to comment');
      return;
    }
    if (!content.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post(`/posts/${postId}/comments`, { content });
      setComments([res.data.data, ...comments]);
      setContent('');
      toast.success('Comment added successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 mt-8">
      <h3 className="text-lg font-semibold text-content-dark dark:text-gray-100">Comments</h3>

      {user ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-3 border border-brand-200 dark:border-gray-600 rounded-md focus:ring-1 focus:ring-brand-500 focus:border-brand-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            rows={3}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-brand-600 text-white px-4 py-2 rounded-md hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:bg-brand-300"
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <p className="text-content-muted dark:text-gray-400">
          Please <a href="/sign-in" className="text-brand-600 dark:text-brand-400 hover:text-brand-500 dark:hover:text-brand-300">login</a> to comment
        </p>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm dark:shadow-lg border border-brand-100 dark:border-gray-700">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-gray-600 flex items-center justify-center">
                    <span className="text-brand-700 dark:text-gray-300 font-medium">
                      {comment.author?.name?.[0]?.toUpperCase() || '?'}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-content-dark dark:text-gray-100 font-medium">{comment.author?.name || 'Anonymous'}</p>
                  <p className="text-content-muted dark:text-gray-400 text-sm">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-2 text-content-main dark:text-gray-100">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}