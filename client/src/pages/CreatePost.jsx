import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [form, setForm] = useState({ title: '', content: '', excerpt: '', category: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('content', form.content);
      fd.append('excerpt', form.excerpt);
      fd.append('category', form.category);
      if (file) fd.append('featuredImage', file);

      const res = await api.post('/posts', fd);
      navigate(`/posts/${res.data.data._id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-content-dark">Create New Post</h2>
      <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-content-dark font-medium">Title</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter post title"
            className="w-full p-3 border border-brand-200 rounded-md text-content-main placeholder-content-muted focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="excerpt" className="block text-content-dark font-medium">Excerpt</label>
          <input
            id="excerpt"
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            placeholder="Brief description of your post"
            className="w-full p-3 border border-brand-200 rounded-md text-content-main placeholder-content-muted focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="category" className="block text-content-dark font-medium">Category</label>
          <input
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category ID (optional)"
            className="w-full p-3 border border-brand-200 rounded-md text-content-main placeholder-content-muted focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="content" className="block text-content-dark font-medium">Content</label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Write your post content here"
            className="w-full p-3 border border-brand-200 rounded-md text-content-main placeholder-content-muted focus:border-brand-500 focus:ring-1 focus:ring-brand-500 h-40"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="image" className="block text-content-dark font-medium">Featured Image</label>
          <input
            id="image"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-content-main file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100"
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-md shadow-sm font-medium transition-colors disabled:bg-brand-300"
          >
            {loading ? 'Saving...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
