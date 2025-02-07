// contexts/use-counter-store-context.tsx
import { type ReactNode, createContext, useContext, useRef } from 'react'
import { create } from 'zustand'
import { useStoreWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'
import { merge } from 'ts-deepmerge'

import { UserState, userStoreCreator } from '@/reducers/user'
import { persist } from 'zustand/middleware'

export const createAuthStore = () => {
  return create(persist(userStoreCreator, {
    name: 'odonto-chat-user',
    merge: (persistedState: unknown, currentState: UserState) => merge(currentState, persistedState as UserState),
    onRehydrateStorage: (state) => {
      return () => state.setHasHydrated(true)
    }    
  }))
}

export type AuthStoreApi = ReturnType<typeof createAuthStore>

export const AuthContext = createContext<AuthStoreApi | undefined>(
  undefined,
)

export interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const storeRef = useRef<AuthStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createAuthStore()
  }

  return (
    <AuthContext.Provider value={storeRef.current}>
      {children}
    </AuthContext.Provider>
  )
}

export type UseAuthContextSelector<T> = (store: UserState) => T

export const useAuthContext = <T,>(
  selector: UseAuthContextSelector<T>,
): T => {
  const authContext = useContext(AuthContext)

  if (authContext === undefined) {
    throw new Error(
      'useAuthContext must be used within AuthProvider',
    )
  }

  return useStoreWithEqualityFn(authContext, selector, shallow)
}
