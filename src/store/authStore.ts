import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";

interface AuthState {
  isAuthenticated: boolean;
  mobileNumber: string | null;
  isSignedUp: boolean;
  signIn: (mobileNumber: string) => void;
  signUp: (mobileNumber: string) => void;
  signOut: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      isAuthenticated: false,
      mobileNumber: null,
      isSignedUp: false,

      signIn: (mobileNumber) => {
        const state = get();
        if (state.isSignedUp) {
          set({ isAuthenticated: true, mobileNumber });
          toast.success("Successfully signed in!");
        } else {
          toast.error("User not found. Please sign up.");
        }
      },

      signUp: (mobileNumber) => {
        set({
          isAuthenticated: true,
          mobileNumber,
          isSignedUp: true,
        });
        toast.success("Signup successful! You are now logged in.");
      },

      signOut: () => {
        set({
          isAuthenticated: false,
          mobileNumber: null,
        });
        toast.info("Logged out successfully.");
      },
    }),
    {
      name: "gemini-clone-auth-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
