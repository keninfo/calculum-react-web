import { create } from 'zustand'

interface StrategyStore {
  coin: string
  setCoin: (coin: string) => void
  strategy: string
  setStrategy: (strategy: string) => void
  network: string
  setNetwork: (strategy: string) => void
}

export const useStrategyStore = create<StrategyStore>((set) => ({
  coin: 'BTC',
  setCoin: (coin) => set({ coin }),
  strategy: 'Momentum',
  setStrategy: (strategy) => set({ strategy }),
  network: 'Arbitrum (Testnet)',
  setNetwork: (network) => set({ network }),
}))
