import { create } from 'zustand'

interface NavbarStore {
  navbarHeight: number
  setNavbarHeight: (navbarHeight: number) => void
}

export const useNavbarStore = create<NavbarStore>((set) => ({
  navbarHeight: 136,
  setNavbarHeight: (navbarHeight) => set({ navbarHeight }),
}))
