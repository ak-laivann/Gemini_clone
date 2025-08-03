import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";

interface AuthState {
  isAuthenticated: boolean;
  mobileNumber: string | null;
  isSignedUp: boolean;
  signIn: (mobileNumber: string) => Promise<void>;
  signUp: (mobileNumber: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      isAuthenticated: false,
      mobileNumber: null,
      isSignedUp: false,

      signIn: (mobileNumber) => {
        return new Promise<void>((resolve, reject) => {
          const state = get();
          if (state.isSignedUp) {
            set({ isAuthenticated: true, mobileNumber });
            toast.success("Successfully signed in!");
            resolve();
          } else {
            toast.error("User not found. Please sign up.");
            reject(new Error("User not found."));
          }
        });
      },

      signUp: (mobileNumber) => {
        return new Promise<void>((resolve) => {
          set({
            isAuthenticated: true,
            mobileNumber,
            isSignedUp: true,
          });
          toast.success("Signup successful! You are now logged in.");
          resolve();
        });
      },

      signOut: () => {
        return new Promise<void>((resolve) => {
          set({
            isAuthenticated: false,
            mobileNumber: null,
          });
          toast.info("Logged out successfully.");
          resolve();
        });
      },
    }),
    {
      name: "gemini-clone-auth-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
