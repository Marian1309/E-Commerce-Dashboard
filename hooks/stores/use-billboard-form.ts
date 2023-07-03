import { create } from 'zustand';

interface UseBillboardFormStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useBillboardFormStore = create<UseBillboardFormStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading })
}));

export default useBillboardFormStore;
