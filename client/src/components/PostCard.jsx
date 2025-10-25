import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../services/api';

export default function PostCard({ post }) {
  const imageUrl = post.featuredImage ? `${IMAGE_BASE_URL}${post.featuredImage}` : null;

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-lg overflow-hidden border dark:border-gray-700">
      <div className="md:flex">
        {imageUrl && (
          <div className="md:w-48 w-full h-44 md:h-auto flex-shrink-0 overflow-hidden">
            <img src={imageUrl} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="p-6 flex-1">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-gray-100">
              <Link to={`/posts/${post._id}`} className="hover:text-brand-400 dark:hover:text-brand-300">{post.title}</Link>
            </h3>
            <span className="ml-4 text-xs bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 px-2 py-1 rounded">{post.category?.name || 'Category'}</span>
          </div>

          <p className="mt-3 text-slate-600 dark:text-gray-300 line-clamp-4">{post.excerpt || post.content?.slice(0, 160) + '...'}</p>

          <div className="mt-4 flex items-center justify-between">
            <Link to={`/posts/${post._id}`} className="text-brand-500 dark:text-brand-400 hover:underline">Read More</Link>
            <div className="text-xs text-slate-400 dark:text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </article>
  );
}
