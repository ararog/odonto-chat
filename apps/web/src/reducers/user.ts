import { create, StateCreator } from "zustand";
import { createSelectors } from "@/lib/zustand";
import { persist } from 'zustand/middleware'
import { merge } from "ts-deepmerge";

import { User } from "@/models/user";

export interface UserState {
  user?: User;
  token?: string;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  logout: () => void;
  saveCredentials: (user: User, isAuthenticated: boolean) => void;
  setHasHydrated: (state: boolean) => void;
}

export const userStoreCreator: StateCreator<UserState> = (set) => ({
  user: undefined,
  token: undefined,
  isAuthenticated: false,
  hasHydrated: false,
  logout: () => {
    localStorage.removeItem("token");
    set({ user: undefined, isAuthenticated: false });
  },
  saveCredentials: (user, isAuthenticated) => {
    set({ user, isAuthenticated });
  },
  setHasHydrated: (state: boolean) => {
    set({
      hasHydrated: state
    });
  },
});

// define the store
export const useUserStore = createSelectors(create(persist(userStoreCreator, {
  name: 'odonto-chat-user',
  merge: (persistedState: unknown, currentState: UserState) => merge(currentState, persistedState as UserState),
  onRehydrateStorage: (state: UserState) => {
    return () => state.setHasHydrated(true)
  }
})));
