import { create } from 'zustand';

interface Link {
  title: string;
  url: string;
}

interface Interest {
  key: string;
  description: string;
}

interface ProfileState {
  profileImage: string;
  profileImageFile: File | null;
  name: string;
  email: string;
  role: string;
  career: string;
  interests: Interest[];
  links: Link[];
  intro: string;
  clientId: number;

  setProfileImage: (image: string) => void;
  setProfileImageFile: (file: File | null) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setRole: (role: string) => void;
  setCareer: (career: string) => void;
  setInterests: (interests: Interest[]) => void;
  setLinks: (links: Link[]) => void;
  setIntro: (intro: string) => void;
  setClientId: (id: number) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profileImage: '',
  profileImageFile: null,
  name: '',
  email: '',
  role: '',
  career: '',
  interests: [],
  links: [],
  intro: '',
  clientId: 0,

  setProfileImage: (image) => set({ profileImage: image }),
  setProfileImageFile: (file) => set({ profileImageFile: file }),
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setRole: (role) => set({ role }),
  setCareer: (career) => set({ career }),
  setInterests: (interests) => set({ interests }),
  setLinks: (links) => set({ links }),
  setIntro: (intro) => set({ intro }),
  setClientId: (id) => set({ clientId: id }),
}));
