'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserAddress = {
  line1: string
  line2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  companyName?: string
  phone?: string
  gstin?: string
  billingAddress?: UserAddress
  shippingAddress?: UserAddress
  customerType: 'retail' | 'wholesale'
}

type UserStore = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  setUser: (user: User | null) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
  setIsLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  updateBillingAddress: (address: UserAddress) => void
  updateShippingAddress: (address: UserAddress) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: (user) => {
        set({ user, isAuthenticated: !!user })
      },

      setIsAuthenticated: (isAuthenticated) => {
        set({ isAuthenticated })
      },

      setIsLoading: (isLoading) => {
        set({ isLoading })
      },

      setError: (error) => {
        set({ error })
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, error: null })
      },

      updateUser: (updates) => {
        const { user } = get()
        if (user) {
          set({ user: { ...user, ...updates } })
        }
      },

      updateBillingAddress: (address) => {
        const { user } = get()
        if (user) {
          set({ user: { ...user, billingAddress: address } })
        }
      },

      updateShippingAddress: (address) => {
        const { user } = get()
        if (user) {
          set({ user: { ...user, shippingAddress: address } })
        }
      },
    }),
    {
      name: 'maddox-tees-user',
    }
  )
)
