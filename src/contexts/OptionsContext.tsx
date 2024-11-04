import type { ReactNode } from 'react'
import React, { createContext, useState } from 'react'

interface OptionsContextType {
  coin: string
  setCoin: React.Dispatch<React.SetStateAction<string>>
  strategy: string
  setStrategy: React.Dispatch<React.SetStateAction<string>>
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
  transactionPending: boolean
  setTransactionPending: React.Dispatch<React.SetStateAction<boolean>>
}

export const OptionsContext = createContext<OptionsContextType>({
  coin: 'BTC',
  setCoin: () => {},
  strategy: 'Smoothcoin',
  setStrategy: () => {},
  rollingWindow: 14,
  setRollingWindow: () => {},
  window: 365,
  setWindow: () => {},
  volatility: 0.2,
  setVolatility: () => {},
  showCandle: false,
  setShowCandle: () => {},
  studyCase: 1,
  setStudyCase: () => {},
  transactionPending: false,
  setTransactionPending: () => {},
})

export const OptionsProvider = ({ children }: { children: ReactNode }) => {
  const [coin, setCoin] = useState<string>('BTC')
  const [strategy, setStrategy] = useState<string>('Smoothcoin')
  const [rollingWindow, setRollingWindow] = useState<number>(14)
  const [window, setWindow] = useState<number>(365)
  const [volatility, setVolatility] = useState<number>(0.2)
  const [showCandle, setShowCandle] = useState<boolean>(false)
  const [studyCase, setStudyCase] = useState<number>(1)
  const [transactionPending, setTransactionPending] = useState<boolean>(false)

  return (
    <OptionsContext.Provider
      value={{
        coin,
        setCoin,
        strategy,
        setStrategy,
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
        transactionPending,
        setTransactionPending,
      }}
    >
      {children}
    </OptionsContext.Provider>
  )
}
