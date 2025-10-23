import { createContext, useContext, useCallback } from 'react';
import { toast } from 'react-hot-toast';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const success = useCallback((message) => {
    toast.success(message, {
      style: {
        background: '#22c55e',
        color: '#fff'
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#22c55e'
      }
    });
  }, []);

  const error = useCallback((message) => {
    toast.error(message, {
      style: {
        background: '#ef4444',
        color: '#fff'
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#ef4444'
      }
    });
  }, []);

  return (
    <ToastContext.Provider value={{ success, error }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}