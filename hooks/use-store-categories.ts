import { create } from 'zustand';

interface UseCategoryIdStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useCategoryIdStore = create<UseCategoryIdStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading })
}));

export default useCategoryIdStore;
