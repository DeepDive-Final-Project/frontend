import { create } from 'zustand';

export interface Tag {
  text: string;
  color: string;
}

export interface User {
  id: number;
  nickName: string;
  role: string;
  career: string;
  introduction: string;
  tags: Tag[];
  image: string;
  latitude?: number;
  longitude?: number;
}

interface UserStore {
  users: User[];
  setUsers: (users: User[]) => void;

  latitude: number | null;
  longitude: number | null;
  setUserLocation: (lat: number, lng: number) => void;

  myProfileImage: string;
  setMyProfileImage: (img: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  latitude: null,
  longitude: null,
  setUserLocation: (lat, lng) => set({ latitude: lat, longitude: lng }),

  myProfileImage: '',
  setMyProfileImage: (img) => set({ myProfileImage: img }),
}));
