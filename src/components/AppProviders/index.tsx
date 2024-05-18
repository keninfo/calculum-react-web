import type { ReactNode } from 'react'
import { useState, createContext } from 'react'

import Web3ModalProvider from '@/services/Web3ModalProvider'

interface CoinContextType {
  coin: string
  setCoin: React.Dispatch<React.SetStateAction<string>>
}

export const CoinContext = createContext<CoinContextType>({
  coin: 'ADA',
  setCoin: () => {},
})

const AppProviders = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const [coin, setCoin] = useState<string>('ADA')

  return (
    <CoinContext.Provider value={{ coin, setCoin }}>
      <Web3ModalProvider>{children}</Web3ModalProvider>
    </CoinContext.Provider>
  )
}

export default AppProviders
