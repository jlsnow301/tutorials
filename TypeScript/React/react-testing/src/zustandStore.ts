import create from "zustand";

type Data = {
  count: number;
  increment: () => void;
};

export const useStore = create<Data>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
