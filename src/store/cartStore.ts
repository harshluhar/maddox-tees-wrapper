'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
  id: string
  productId: string
  title: string
  price: number
  quantity: number
  size?: string
  color?: string
  image?: string
  customization?: {
    type: 'none' | 'dtf' | 'custom'
    designFile?: string
    notes?: string
    additionalCost: number
  }
}

type CartStore = {
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  addItem: (item: CartItem) => void
  updateItem: (id: string, updates: Partial<CartItem>) => void
  removeItem: (id: string) => void
  clearCart: () => void
  calculateTotals: () => void
  setShipping: (amount: number) => void
  setDiscount: (amount: number) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0,
      discount: 0,
      total: 0,

      addItem: (item) => {
        const { items } = get()
        const existingItemIndex = items.findIndex(
          (i) =>
            i.productId === item.productId &&
            i.size === item.size &&
            i.color === item.color &&
            JSON.stringify(i.customization) === JSON.stringify(item.customization),
        )

        if (existingItemIndex !== -1) {
          // Update quantity if item already exists
          const updatedItems = [...items]
          if (updatedItems[existingItemIndex]) {
            updatedItems[existingItemIndex].quantity += item.quantity
            set({ items: updatedItems })
          }
        } else {
          // Add new item with unique ID
          set({ items: [...items, { ...item, id: crypto.randomUUID() }] })
        }

        get().calculateTotals()
      },

      updateItem: (id, updates) => {
        const { items } = get()
        const updatedItems = items.map((item) => (item.id === id ? { ...item, ...updates } : item))
        set({ items: updatedItems })
        get().calculateTotals()
      },

      removeItem: (id) => {
        const { items } = get()
        const updatedItems = items.filter((item) => item.id !== id)
        set({ items: updatedItems })
        get().calculateTotals()
      },

      clearCart: () => {
        set({
          items: [],
          subtotal: 0,
          tax: 0,
          shipping: 0,
          discount: 0,
          total: 0,
        })
      },

      calculateTotals: () => {
        const { items, shipping, discount } = get()

        // Calculate subtotal
        const subtotal = items.reduce(
          (sum, item) =>
            sum +
            item.price * item.quantity +
            (item.customization?.additionalCost || 0) * item.quantity,
          0,
        )

        // Calculate tax (18% GST)
        const tax = subtotal * 0.18

        // Calculate total
        const total = subtotal + tax + shipping - discount

        set({ subtotal, tax, total })
      },

      setShipping: (amount) => {
        set({ shipping: amount })
        get().calculateTotals()
      },

      setDiscount: (amount) => {
        set({ discount: amount })
        get().calculateTotals()
      },
    }),
    {
      name: 'maddox-tees-cart',
    },
  ),
)
