import { create } from 'zustand';

interface Counter {
  counter: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
}

const useCounterStore = create<Counter>((set) => {
  return {
    counter: 0,
    increase: () => set((state) => ({ counter: state.counter + 1 })),
    decrease: () => set((state) => ({ counter: state.counter - 1 })),
    reset: () => set(() => ({ counter: 0 }))
  };
});

export default useCounterStore;
