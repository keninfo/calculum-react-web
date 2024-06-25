import { CacheProvider } from '@emotion/react'
import { MetaMaskUIProvider } from '@metamask/sdk-react-ui'

import type { ReactNode } from 'react'
import { useState, createContext } from 'react'

import RainbowKit from '@/services/RainbowKitProvider'
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
  studyCase: number
  setStudyCase: React.Dispatch<React.SetStateAction<number>>
}

export const OptionsContext = createContext<OptionsContextType>({
  coin: 'BTC - High Vol',
  setCoin: () => {},
  rollingWindow: 14,
  setRollingWindow: () => {},
  window: 365,
  setWindow: () => {},
  volatility: 0.2,
  setVolatility: () => {},
  showCandle: false,
  setShowCandle: () => {},
  studyCase: 0,
  setStudyCase: () => {},
})

interface ProContextType {
  pro: boolean
  setPro: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProContext = createContext<ProContextType>({
  pro: false,
  setPro: () => {},
})

const clientSideEmotionCache = createEmotionCache()

const AppProviders = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const [coin, setCoin] = useState<string>('BTC - High Vol')
  const [rollingWindow, setRollingWindow] = useState<number>(14)
  const [window, setWindow] = useState<number>(365)
  const [volatility, setVolatility] = useState<number>(0.2)
  const [showCandle, setShowCandle] = useState<boolean>(false)
  const [pro, setPro] = useState<boolean>(false)
  const [studyCase, setStudyCase] = useState<number>(0)

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
            studyCase,
            setStudyCase,
          }}
        >
          <ProContext.Provider value={{ pro, setPro }}>
            <RainbowKit>{children}</RainbowKit>
          </ProContext.Provider>
        </OptionsContext.Provider>
      </CacheProvider>
    </MetaMaskUIProvider>
  )
}

export default AppProviders
