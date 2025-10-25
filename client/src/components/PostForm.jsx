import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { IMAGE_BASE_URL } from '../services/api';

const schema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  content: z.string()
    .min(1, 'Content is required')
    .max(10000, 'Content must be less than 10000 characters'),
  excerpt: z.string()
    .max(200, 'Excerpt must be less than 200 characters')
    .optional(),
  category: z.string()
    .optional(),
  tags: z.string()
    .transform(val => val.split(',').map(tag => tag.trim()).filter(Boolean))
    .optional(),
  isPublished: z.boolean().default(true)
});

export default function PostForm({ 
  initialData,
  onSubmit,
  loading = false 
}) {
  const [imagePreview, setImagePreview] = useState(initialData?.featuredImage ? `${IMAGE_BASE_URL}${initialData.featuredImage}` : null);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialData?.title || '',
      content: initialData?.content || '',
      excerpt: initialData?.excerpt || '',
      category: initialData?.category?._id || '',
      tags: initialData?.tags?.join(', ') || '',
      isPublished: initialData?.isPublished ?? true
    }
  });

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Title</label>
        <input
          type="text"
          {...register('title')}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Content</label>
        <textarea
          {...register('content')}
          rows="6"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Excerpt</label>
        <input
          type="text"
          {...register('excerpt')}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        {errors.excerpt && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.excerpt.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
          Featured Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 file:bg-gray-50 dark:file:bg-gray-600 file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 file:text-gray-700 dark:file:text-gray-300"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-2 max-h-48 rounded-lg"
          />
        )}
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Tags</label>
        <input
          type="text"
          {...register('tags')}
          placeholder="Separate tags with commas"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        {errors.tags && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.tags.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          {...register('isPublished')}
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
        />
        <label className="ml-2 text-gray-700 dark:text-gray-300">Publish immediately</label>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition duration-200 ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Saving...' : 'Save Post'}
        </button>
      </div>
    </form>
  );
}