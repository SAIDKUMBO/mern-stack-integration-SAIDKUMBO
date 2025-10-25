import axios from 'axios';

const api = axios.create({
  baseURL: "https://mern-stack-integration-saidkumbo-3.onrender.com/api"
});

// ✅ Request interceptor for Clerk auth token - will be set dynamically
api.interceptors.request.use(async (config) => {
  try {
    // This will be handled by the component using the API
    // For now, we'll skip auth for development
    return config;
  } catch (error) {
    console.error('Error getting token:', error);
    return config;
  }
});

// Auth service
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  syncClerkUser: async (userData) => {
    const response = await api.post('/auth/sync-clerk-user', userData);
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  }
};

// Posts service
export const postService = {
  getPosts: async (params) => {
    const response = await api.get('/posts', { params });
    return response.data;
  },
  getPost: async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },
  createPost: async (postData) => {
    console.log('API createPost called with:', postData);
    const response = await api.post('/posts', postData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  },
  updatePost: async (id, postData) => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  },
  deletePost: async (id) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  }
};

// Comments service
export const commentService = {
  getComments: async (postId) => {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  },
  createComment: async (postId, content) => {
    const response = await api.post(`/posts/${postId}/comments`, { content });
    return response.data;
  },
  deleteComment: async (postId, commentId) => {
    const response = await api.delete(`/posts/${postId}/comments/${commentId}`);
    return response.data;
  }
};

export default api;
