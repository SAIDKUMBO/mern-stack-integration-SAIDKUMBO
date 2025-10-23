import { createContext, useContext, useReducer } from 'react';

const PostContext = createContext();

const initialState = {
  posts: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    category: '',
    page: 1
  },
  meta: {
    total: 0,
    pages: 1,
    page: 1
  }
};

function postReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_POSTS':
      return { 
        ...state, 
        posts: action.payload.data,
        meta: action.payload.meta,
        error: null 
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'UPDATE_FILTERS':
      return { 
        ...state, 
        filters: { ...state.filters, ...action.payload },
        meta: { ...state.meta, page: 1 } // Reset page when filters change
      };
    case 'ADD_POST':
      return { 
        ...state, 
        posts: [action.payload, ...state.posts],
        meta: { ...state.meta, total: state.meta.total + 1 }
      };
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(post => 
          post._id === action.payload._id ? action.payload : post
        )
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
        meta: { ...state.meta, total: state.meta.total - 1 }
      };
    default:
      return state;
  }
}

export function PostProvider({ children }) {
  const [state, dispatch] = useReducer(postReducer, initialState);

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
}