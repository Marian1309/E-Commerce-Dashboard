import { create } from 'zustand';

interface UseStoreModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useStoreModal = create<UseStoreModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading })
}));

export default useStoreModal;
