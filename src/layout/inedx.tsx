import { useSearchStore } from '@/store/search-store';
import { useEffect } from 'react';
import { Outlet } from 'react-router';
import Header from './Header';

export default function Layout() {
  const { searchTerm, setDebouncedSearch } = useSearchStore();
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, setDebouncedSearch]);
  return (
    <div className="min-h-screen bg-muted">
      <Header />
      <main>
        <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
