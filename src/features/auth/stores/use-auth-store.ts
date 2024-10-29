import { create } from 'zustand';
import { User } from '../types/User';

type AuthStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string;
  setToken: (token: string) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  token: '',
  setToken: (token) => set({ token }),
}));
