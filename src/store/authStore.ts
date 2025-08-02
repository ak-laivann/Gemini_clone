import { create } from "zustand";

interface AuthState {
  isSignedIn: boolean;
  signIn: () => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isSignedIn: false,
  signIn: () => set({ isSignedIn: true }),
  signOut: () => set({ isSignedIn: false }),
}));
