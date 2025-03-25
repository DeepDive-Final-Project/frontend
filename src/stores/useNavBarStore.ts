import { create } from 'zustand';

interface NavBarState {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export const useNavBarStore = create<NavBarState>((set) => ({
  activeIndex: 0,
  setActiveIndex: (index) => set({ activeIndex: index }),
}));
