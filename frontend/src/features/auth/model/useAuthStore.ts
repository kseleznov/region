import { create } from "zustand";
import type { User } from "./types";

interface AuthState {
  user: User | null;
  /** `false` until the startup `/auth/me` probe settles — lets guards tell
   *  "still checking" apart from "definitely logged out". */
  isReady: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  markReady: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isReady: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  markReady: () => set({ isReady: true }),
}));
