import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { authService } from '../services/api';
import { toast } from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user: clerkUser, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded) {
      if (clerkUser) {
        syncClerkUserToDB();
      } else {
        setUser(null);
        setLoading(false);
      }
    }
  }, [clerkUser, isLoaded]);

  const syncClerkUserToDB = async () => {
    try {
      const userData = {
        clerkId: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        username: clerkUser.username,
        imageUrl: clerkUser.imageUrl
      };

      const { data } = await authService.syncClerkUser(userData);
      setUser(data.user);
    } catch (error) {
      console.error('Failed to sync user to database:', error);
      // Still set basic user info from Clerk
      setUser({
        id: clerkUser.id,
        name: clerkUser.fullName,
        email: clerkUser.primaryEmailAddress?.emailAddress,
        imageUrl: clerkUser.imageUrl
      });
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const { data } = await authService.login(credentials);
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
    const { data } = await authService.register(userData);
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};