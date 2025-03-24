import { create } from 'zustand';

interface BottomSheetState {
  height: number;
  mode: 'explore' | 'chat';
  setHeight: (height: number) => void;
  resetHeight: () => void;
  setMode: (mode: 'explore' | 'chat') => void;
  chatTab: 'sent' | 'received';
  setChatTab: (tab: 'sent' | 'received') => void;
}

const INITIAL_HEIGHT = 100;

export const useBottomSheetStore = create<BottomSheetState>((set) => ({
  height: INITIAL_HEIGHT,
  mode: 'explore',
  setHeight: (height) => set({ height }),
  resetHeight: () => set({ height: INITIAL_HEIGHT }),
  setMode: (mode) => set({ mode }),
  chatTab: 'sent',
  setChatTab: (tab) => set({ chatTab: tab }),
}));
