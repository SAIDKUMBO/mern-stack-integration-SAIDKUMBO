import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
          >
            MERN Blog
          </Link>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link 
                  to="/categories"
                  className="px-4 py-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
                >
                  Categories
                </Link>
                <Link 
                  to="/posts/new" 
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-md hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition duration-200"
                >
                  New Post
                </Link>
                <div className="relative group">
                  <Link 
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
                  >
                    <span>{user.name}</span>
                  </Link>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-700 hover:text-red-600 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-purple-600 hover:text-purple-700 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-md hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}