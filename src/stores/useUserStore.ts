import { create } from 'zustand';

interface User {
  name: string;
  id: number;
  latitude: number;
  longitude: number;
  role: string;
  interests: string[];
}

interface UserState {
  latitude: number | null;
  longitude: number | null;
  users: User[];
  interests: string[];
  setUserLocation: (latitude: number, longitude: number) => void;
  setInterests: (interests: string[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  latitude: null,
  longitude: null,
  interests: [],
  users: [
    {
      id: 1,
      latitude: 36.2916,
      longitude: 128.99199,
      name: '박영희',
      role: 'Product Designer',
      interests: ['축구', '농구'],
    },
    {
      id: 2,
      latitude: 36.26759,
      longitude: 124.99997,
      name: '박민수',
      role: 'Front-End Developer',
      interests: ['농구', '독서'],
    },
    {
      id: 3,
      latitude: 39.32138,
      longitude: 128.01196,
      name: '김철수',
      role: 'Back-End Developer',
      interests: ['코딩', '등산'],
    },
    {
      id: 4,
      latitude: 37.89157,
      longitude: 126.182999,
      name: '최영수',
      role: 'Product Owner',
      interests: ['축구', '요가'],
    },
  ],
  setUserLocation: (latitude, longitude) => set({ latitude, longitude }),
  setInterests: (interests) => set({ interests }),
}));
