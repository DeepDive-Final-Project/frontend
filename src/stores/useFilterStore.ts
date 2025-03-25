import { create } from 'zustand';

interface FilterState {
  role: string | null;
  career: string | null;
  setRole: (role: string) => void;
  setCareer: (career: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  role: null,
  career: null,
  setRole: (role) =>
    set((state) => ({
      role,
      career: role === '학생' || role === '기타' ? null : state.career,
    })),
  setCareer: (career) => set({ career }),
  resetFilters: () => set({ role: null, career: null }),
}));
