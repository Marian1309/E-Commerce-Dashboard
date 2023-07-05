import { create } from 'zustand';

interface UseStoreModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useStoreModalStore = create<UseStoreModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading })
}));

export default useStoreModalStore;
