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
  name: string;
  email: string;
  role: string;
  career: string;
  interests: Interest[];
  links: Link[];
  intro: string;

  setProfileImage: (image: string) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setRole: (role: string) => void;
  setCareer: (career: string) => void;
  setInterests: (interests: Interest[]) => void;
  setLinks: (links: Link[]) => void;
  setIntro: (intro: string) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profileImage: '',
  name: '',
  email: '',
  role: '',
  career: '',
  interests: [],
  links: [],
  intro: '',

  setProfileImage: (image) => set({ profileImage: image }),
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setRole: (role) => set({ role }),
  setCareer: (career) => set({ career }),
  setInterests: (interests) => set({ interests }),
  setLinks: (links) => set({ links }),
  setIntro: (intro) => set({ intro }),
}));
