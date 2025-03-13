import { create } from 'zustand'

interface SelectionStore {
  selectedToken: string
  setSelectedToken: (selectedToken: string) => void

  selectedStrategy: string
  setSelectedStrategy: (selectedStrategy: string) => void

  selectedChain: string
  setSelectedChain: (selectedChain: string) => void
}

export const useSelectionStore = create<SelectionStore>((set) => ({
  selectedToken: 'All Tokens',
  setSelectedToken: (selectedToken) => set({ selectedToken }),

  selectedStrategy: 'All Strategies',
  setSelectedStrategy: (selectedStrategy) => set({ selectedStrategy }),

  selectedChain: 'All Chains',
  setSelectedChain: (selectedChain) => set({ selectedChain }),
}))
