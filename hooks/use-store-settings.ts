import { create } from 'zustand';

interface UseSettingsStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useSettingsStore = create<UseSettingsStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading })
}));

export default useSettingsStore;
