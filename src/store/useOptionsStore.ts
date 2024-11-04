import { create } from 'zustand'

interface OptionsStore {
  coin: string
  setCoin: (coin: string) => void
  strategy: string
  setStrategy: (strategy: string) => void
  rollingWindow: number
  setRollingWindow: (rollingWindow: number) => void
  window: number
  setWindow: (window: number) => void
  volatility: number
  setVolatility: (volatility: number) => void
  showCandle: boolean
  setShowCandle: (showCandle: boolean) => void
  studyCase: number
  setStudyCase: (studyCase: number) => void
}

export const useOptionsStore = create<OptionsStore>((set) => ({
  coin: 'BTC',
  setCoin: (coin) => set({ coin }),
  strategy: 'Smoothcoin',
  setStrategy: (strategy) => set({ strategy }),
  rollingWindow: 14,
  setRollingWindow: (rollingWindow) => set({ rollingWindow }),
  window: 365,
  setWindow: (window) => set({ window }),
  volatility: 0.2,
  setVolatility: (volatility) => set({ volatility }),
  showCandle: false,
  setShowCandle: (showCandle) => set({ showCandle }),
  studyCase: 1,
  setStudyCase: (studyCase) => set({ studyCase }),
}))
