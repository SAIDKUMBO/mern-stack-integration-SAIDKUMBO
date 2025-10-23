import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-brand-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-extrabold text-content-dark hover:text-brand-600 transition-colors">
            My Blog
          </Link>
          <nav className="hidden md:flex gap-4 text-content-muted">
            <Link to="/" className="hover:text-content-dark transition-colors">Home</Link>
            <Link to="/create" className="hover:text-content-dark transition-colors">Add Post</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
          <button
            onClick={() => navigate('/create')}
            className="hidden sm:inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-md shadow transition-colors"
          >
            Add Post
          </button>
          <button
            onClick={logout}
            className="text-content-muted hover:text-content-dark transition-colors"
          >
            Logout
          </button>
            </>
          ) : (
            <div className="flex gap-4">
              <Link 
                to="/login"
                className="text-content-muted hover:text-content-dark transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-md shadow transition-colors"
              >
                Register
              </Link>
            </div>
          )}

          <SearchBar />
        </div>
      </div>
    </header>
  );
}
