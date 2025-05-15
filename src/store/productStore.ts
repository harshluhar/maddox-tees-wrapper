'use client'

import { create } from 'zustand'

export type ProductFilter = {
  categories?: string[]
  sizes?: string[]
  colors?: string[]
  materials?: string[]
  priceRange?: [number, number]
  brands?: string[]
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular'
  search?: string
}

type ProductStore = {
  filters: ProductFilter
  isLoading: boolean
  selectedProduct: string | null
  selectedSize: string | null
  selectedColor: string | null
  customizationType: 'none' | 'dtf' | 'custom'
  designFile: string | null
  customizationNotes: string
  
  setFilters: (filters: ProductFilter) => void
  resetFilters: () => void
  setIsLoading: (isLoading: boolean) => void
  setSelectedProduct: (productId: string | null) => void
  setSelectedSize: (size: string | null) => void
  setSelectedColor: (color: string | null) => void
  setCustomizationType: (type: 'none' | 'dtf' | 'custom') => void
  setDesignFile: (fileUrl: string | null) => void
  setCustomizationNotes: (notes: string) => void
  resetProductSelection: () => void
}

export const useProductStore = create<ProductStore>((set) => ({
  filters: {},
  isLoading: false,
  selectedProduct: null,
  selectedSize: null,
  selectedColor: null,
  customizationType: 'none',
  designFile: null,
  customizationNotes: '',

  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }))
  },

  resetFilters: () => {
    set({ filters: {} })
  },

  setIsLoading: (isLoading) => {
    set({ isLoading })
  },

  setSelectedProduct: (productId) => {
    set({ selectedProduct: productId })
  },

  setSelectedSize: (size) => {
    set({ selectedSize: size })
  },

  setSelectedColor: (color) => {
    set({ selectedColor: color })
  },

  setCustomizationType: (type) => {
    set({ customizationType: type })
  },

  setDesignFile: (fileUrl) => {
    set({ designFile: fileUrl })
  },

  setCustomizationNotes: (notes) => {
    set({ customizationNotes: notes })
  },

  resetProductSelection: () => {
    set({
      selectedProduct: null,
      selectedSize: null,
      selectedColor: null,
      customizationType: 'none',
      designFile: null,
      customizationNotes: '',
    })
  },
}))
