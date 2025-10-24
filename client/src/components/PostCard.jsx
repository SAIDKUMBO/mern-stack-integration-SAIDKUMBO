import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  const imageUrl = post.featuredImage ? `${import.meta.env.VITE_API_URL?.replace('/api','') || 'http://localhost:5000'}${post.featuredImage}` : null;

  return (
    <article className="bg-white rounded-xl shadow-sm overflow-hidden border">
      <div className="md:flex">
        {imageUrl && (
          <div className="md:w-48 w-full h-44 md:h-auto flex-shrink-0 overflow-hidden">
            <img src={imageUrl} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="p-6 flex-1">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-semibold text-slate-800">
              <Link to={`/posts/${post._id}`}>{post.title}</Link>
            </h3>
            <span className="ml-4 text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">{post.category?.name || 'Category'}</span>
          </div>

          <p className="mt-3 text-slate-600 line-clamp-4">{post.excerpt || post.content?.slice(0, 160) + '...'}</p>

          <div className="mt-4 flex items-center justify-between">
            <Link to={`/posts/${post._id}`} className="text-brand-500 hover:underline">Read More</Link>
            <div className="text-xs text-slate-400">{new Date(post.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </article>
  );
}
