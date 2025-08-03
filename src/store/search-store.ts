import { create } from 'zustand';

type SearchStore = {
  debouncedSearch: string;
  setDebouncedSearch: (term: string) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  debouncedSearch: '',
  setDebouncedSearch: (term) => set({ debouncedSearch: term }),
}));
