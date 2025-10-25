import { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

export default function SearchBar() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    navigate({ pathname: '/', search: createSearchParams({ search: q }).toString() });
  };

  return (
    <form onSubmit={submit} className="flex items-center">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search posts..."
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-48 sm:w-64 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
      />
      <button type="submit" className="ml-2 bg-slate-100 dark:bg-gray-600 hover:bg-slate-200 dark:hover:bg-gray-500 px-3 py-2 rounded-md text-gray-900 dark:text-gray-100 transition-colors">
        Search
      </button>
    </form>
  );
}
