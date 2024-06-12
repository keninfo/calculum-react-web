import { CacheProvider } from '@emotion/react'
import { MetaMaskUIProvider } from '@metamask/sdk-react-ui'

import type { ReactNode } from 'react'
import { useState, createContext } from 'react'

import Web3ModalProvider from '@/services/Web3ModalProvider'
import createEmotionCache from '@/utils/createEmotionCache'

interface OptionsContextType {
  coin: string
  setCoin: React.Dispatch<React.SetStateAction<string>>
  rollingWindow: number
  setRollingWindow: React.Dispatch<React.SetStateAction<number>>
  window: number
  setWindow: React.Dispatch<React.SetStateAction<number>>
  volatility: number
  setVolatility: React.Dispatch<React.SetStateAction<number>>
  showCandle: boolean
  setShowCandle: React.Dispatch<React.SetStateAction<boolean>>
}

export const OptionsContext = createContext<OptionsContextType>({
  coin: 'BTC',
  setCoin: () => {},
  rollingWindow: 14,
  setRollingWindow: () => {},
  window: 365,
  setWindow: () => {},
  volatility: 0.2,
  setVolatility: () => {},
  showCandle: false,
  setShowCandle: () => {},
})

const clientSideEmotionCache = createEmotionCache()

const AppProviders = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const [coin, setCoin] = useState<string>('BTC')
  const [rollingWindow, setRollingWindow] = useState<number>(14)
  const [window, setWindow] = useState<number>(365)
  const [volatility, setVolatility] = useState<number>(0.2)
  const [showCandle, setShowCandle] = useState<boolean>(false)

  return (
    <MetaMaskUIProvider
      sdkOptions={{
        dappMetadata: {
          // url: window.location.href,
        },
      }}
    >
      <CacheProvider value={clientSideEmotionCache}>
        <OptionsContext.Provider
          value={{
            coin,
            setCoin,
            rollingWindow,
            setRollingWindow,
            window,
            setWindow,
            volatility,
            setVolatility,
            showCandle,
            setShowCandle,
          }}
        >
          <Web3ModalProvider>{children}</Web3ModalProvider>
        </OptionsContext.Provider>
      </CacheProvider>
    </MetaMaskUIProvider>
  )
}

export default AppProviders
