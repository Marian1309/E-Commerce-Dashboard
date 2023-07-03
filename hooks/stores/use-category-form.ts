import { create } from 'zustand';

interface UseCategoryFormStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useCategoryFormStore = create<UseCategoryFormStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading })
}));

export default useCategoryFormStore;
