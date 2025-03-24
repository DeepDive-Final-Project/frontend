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
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));
