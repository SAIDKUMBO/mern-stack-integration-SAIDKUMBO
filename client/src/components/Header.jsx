import { Link, useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-brand-100 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-extrabold text-content-dark dark:text-gray-100 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            My Blog
          </Link>
          <nav className="hidden md:flex gap-4 text-content-muted dark:text-gray-300">
            <Link to="/" className="hover:text-content-dark dark:hover:text-gray-100 transition-colors">Home</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <SignedIn>
            <button
              onClick={() => navigate('/create')}
              className="hidden sm:inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-md shadow transition-colors"
            >
              Add Post
            </button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-4">
              <SignInButton mode="modal">
                <button className="text-content-muted dark:text-gray-300 hover:text-content-dark dark:hover:text-gray-100 transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-md shadow transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SearchBar />
        </div>
      </div>
    </header>
  );
}
