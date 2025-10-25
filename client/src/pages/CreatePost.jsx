import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import { postService } from '../services/api';

export default function CreatePost() {
  const [form, setForm] = useState({ title: '', content: '', excerpt: '', category: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to create a post');
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('content', form.content);
      if (form.excerpt.trim()) fd.append('excerpt', form.excerpt);
      fd.append('authorId', user.id);
      fd.append('authorName', user.fullName || user.username);
      fd.append('isPublished', form.isPublished ? 'true' : 'false');
      if (file) fd.append('featuredImage', file);

      console.log('Submitting form data:', {
        title: form.title,
        content: form.content,
        excerpt: form.excerpt,
        authorId: user.id,
        authorName: user.fullName || user.username,
        isPublished: form.isPublished ? 'true' : 'false',
        hasFile: !!file
      });

      const res = await postService.createPost(fd);
      toast.success('Post created successfully!');
      navigate('/');
    } catch (err) {
      console.error('Create post error:', err);
      console.error('Error response:', err.response?.data);
      toast.error(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-content-dark dark:text-gray-100">Create New Post</h2>

      <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-lg space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-content-dark dark:text-gray-300 font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter post title"
            className="w-full p-3 border border-brand-200 dark:border-gray-600 rounded-md text-content-main dark:text-gray-100 placeholder-content-muted dark:placeholder-gray-400 bg-white dark:bg-gray-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="excerpt" className="block text-content-dark dark:text-gray-300 font-medium">
            Excerpt
          </label>
          <input
            id="excerpt"
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            placeholder="Brief description of your post"
            className="w-full p-3 border border-brand-200 dark:border-gray-600 rounded-md text-content-main dark:text-gray-100 placeholder-content-muted dark:placeholder-gray-400 bg-white dark:bg-gray-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block text-content-dark dark:text-gray-300 font-medium">
            Category
          </label>
          <input
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category ID (optional)"
            className="w-full p-3 border border-brand-200 dark:border-gray-600 rounded-md text-content-main dark:text-gray-100 placeholder-content-muted dark:placeholder-gray-400 bg-white dark:bg-gray-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="block text-content-dark dark:text-gray-300 font-medium">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Write your post content here"
            className="w-full p-3 border border-brand-200 dark:border-gray-600 rounded-md text-content-main dark:text-gray-100 placeholder-content-muted dark:placeholder-gray-400 bg-white dark:bg-gray-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 h-40"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="image" className="block text-content-dark dark:text-gray-300 font-medium">
            Featured Image
          </label>
          <div className="space-y-2">
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  if (file.size > 5 * 1024 * 1024) {
                    toast.error('Image size should be less than 5MB');
                    e.target.value = '';
                    return;
                  }
                  setFile(file);
                }
              }}
              className="w-full text-content-main dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-brand-50 dark:file:bg-gray-600 file:text-brand-700 dark:file:text-gray-300 hover:file:bg-brand-100 dark:hover:file:bg-gray-500"
            />

            {file && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full max-w-md h-48 object-cover rounded-md"
                />
              </div>
            )}
          </div>
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
