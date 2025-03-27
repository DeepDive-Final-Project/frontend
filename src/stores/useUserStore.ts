import { create } from 'zustand';

export interface Tag {
  text: string;
  color: string;
}

export interface User {
  id: number;
  name: string;
  role: string;
  career: string;
  message: string;
  latitude?: number;
  longitude?: number;
  image: string;
  tags: Tag[];
}

interface UserStore {
  users: User[];
  setUsers: (users: User[]) => void;

  latitude: number | null;
  longitude: number | null;
  setUserLocation: (lat: number, lng: number) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  latitude: null,
  longitude: null,
  setUserLocation: (lat, lng) => set({ latitude: lat, longitude: lng }),
}));
