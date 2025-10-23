import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';

  useEffect(() => {
    setLoading(true);
    api.get('/posts', { params: { page, limit: 6, search } })
      .then(res => {
        setPosts(res.data.data || []);
        setMeta(res.data.meta || { page: 1, pages: 1 });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page, search]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Recent Posts</h1>
      </div>

      {loading ? (
        <div className="text-center py-16">Loading...</div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map(p => <PostCard key={p._id} post={p} />)}
          </div>

          <div className="mt-8 flex justify-center">
            <Pagination meta={meta} search={search} />
          </div>
        </>
      )}
    </div>
  );
}

function Pagination({ meta, search }) {
  const pages = Array.from({ length: meta.pages }, (_, i) => i + 1);
  return (
    <nav className="inline-flex items-center gap-2">
      {pages.map(p => (
        <a
          key={p}
          href={`/?page=${p}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
          className={`px-3 py-1 rounded-md ${p === meta.page ? 'bg-brand-600 text-white' : 'bg-white border'}`}
        >
          {p}
        </a>
      ))}
    </nav>
  );
}
