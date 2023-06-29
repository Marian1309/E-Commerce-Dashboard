import { create } from 'zustand';

interface UseStoreModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useStoreModal = create<UseStoreModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useStoreModal;
