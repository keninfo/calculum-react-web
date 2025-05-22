import { create } from 'zustand'

interface ProState {
  pro: boolean
  setPro: (pro: boolean) => void
}

export const useProStore = create<ProState>((set) => ({
  pro: true,
  setPro: (pro) => set({ pro }),
}))
