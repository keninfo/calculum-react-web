import { CacheProvider } from '@emotion/react'

import type { ReactNode } from 'react'
import { useState, createContext } from 'react'

import Web3ModalProvider from '@/services/Web3ModalProvider'
import createEmotionCache from '@/utils/createEmotionCache'

interface CoinContextType {
  coin: string
  setCoin: React.Dispatch<React.SetStateAction<string>>
}

interface SidebarContextType {
  isSidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CoinContext = createContext<CoinContextType>({
  coin: 'ADA',
  setCoin: () => {},
})

export const SidebarContext = createContext<SidebarContextType>({
  isSidebarOpen: true,
  setSidebarOpen: () => {},
})
const clientSideEmotionCache = createEmotionCache()

const AppProviders = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const [coin, setCoin] = useState<string>('ADA')
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false)

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <CoinContext.Provider value={{ coin, setCoin }}>
        <SidebarContext.Provider value={{ isSidebarOpen, setSidebarOpen }}>
          <Web3ModalProvider>{children}</Web3ModalProvider>
        </SidebarContext.Provider>
      </CoinContext.Provider>
    </CacheProvider>
  )
}

export default AppProviders
