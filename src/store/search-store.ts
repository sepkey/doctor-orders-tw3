import { create } from 'zustand';

type SearchStore = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearchTerm: () => void;
  debouncedSearch: string;
  setDebouncedSearch: (term: string) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  clearSearchTerm: () => set({ searchTerm: '' }),
  debouncedSearch: '',
  setDebouncedSearch: (term) => set({ debouncedSearch: term }),
}));
