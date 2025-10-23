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
        className="px-3 py-2 border rounded-md w-48 sm:w-64 focus:outline-none focus:ring-2 focus:ring-brand-500"
      />
      <button type="submit" className="ml-2 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-md">
        Search
      </button>
    </form>
  );
}
