import { create } from 'zustand';

interface UseModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useModalStore = create<UseModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading })
}));

export default useModalStore;
