import { create } from 'zustand';

interface UseSizesStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useSizesStore = create<UseSizesStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading })
}));

export default useSizesStore;
