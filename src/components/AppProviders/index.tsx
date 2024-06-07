import { CacheProvider } from '@emotion/react'
import { MetaMaskUIProvider } from '@metamask/sdk-react-ui'

import type { ReactNode } from 'react'
import { useState, createContext } from 'react'

import Web3ModalProvider from '@/services/Web3ModalProvider'
import createEmotionCache from '@/utils/createEmotionCache'

interface CoinContextType {
  coin: string
  setCoin: React.Dispatch<React.SetStateAction<string>>
}

export const CoinContext = createContext<CoinContextType>({
  coin: 'BTC',
  setCoin: () => {},
})

const clientSideEmotionCache = createEmotionCache()

const AppProviders = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const [coin, setCoin] = useState<string>('BTC')

  return (
    <MetaMaskUIProvider
      sdkOptions={{
        dappMetadata: {
          // url: window.location.href,
        },
      }}
    >
      <CacheProvider value={clientSideEmotionCache}>
        <CoinContext.Provider value={{ coin, setCoin }}>
          <Web3ModalProvider>{children}</Web3ModalProvider>
        </CoinContext.Provider>
      </CacheProvider>
    </MetaMaskUIProvider>
  )
}

export default AppProviders
