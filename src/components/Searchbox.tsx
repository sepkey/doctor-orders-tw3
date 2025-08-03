import { useDebounce } from '@/hooks/use-debounce';
import { useSearchStore } from '@/store/search-store';
import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from './ui/input';

export default function Searchbox() {
  const { setDebouncedSearch } = useSearchStore();
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 500);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setDebouncedSearch('');
      return;
    }
    setDebouncedSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, searchTerm, setDebouncedSearch]);

  return (
    <div className="relative flex-1 max-w-xs mx-4">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
      <Input
        type="text"
        placeholder="جستجو..."
        className="w-full pl-9 pr-3 py-2 rounded-md border focus:outline-none focus:ring-2  "
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
