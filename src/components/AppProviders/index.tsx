'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { CacheProvider } from '@emotion/react'
import { MetaMaskUIProvider } from '@metamask/sdk-react-ui'

import type { ReactNode } from 'react'
import { useState, createContext, useEffect } from 'react'

import RainbowKit from '@/services/RainbowKitProvider'
import createEmotionCache from '@/utils/createEmotionCache'

import * as d3 from 'd3'
import { timeParse } from 'd3-time-format'

const parseDate = timeParse('%Y-%m-%d')
const formatTime = d3.utcFormat('%B %d, %Y')

const parseData = (data: any) => {
  return data.map((obj: any) => {
    const { ['']: dateString, ...rest } = obj
    const date = dateString ? parseDate(dateString) : null
    const formattedDate = date ? formatTime(date) : null
    return { date: formattedDate, ...rest }
  })
}

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
  coin: 'BTC - Controlled Vol',
  setCoin: () => {},
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
})

interface ProContextType {
  pro: boolean
  setPro: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProContext = createContext<ProContextType>({
  pro: true,
  setPro: () => {},
})

interface CoinsContextType {
  dates: Date[] | null
  values: number[][] | null
  coins: string[] | null
  setDates: React.Dispatch<React.SetStateAction<Date[] | null>>
  setValues: React.Dispatch<React.SetStateAction<number[][] | null>>
  setCoins: React.Dispatch<React.SetStateAction<string[] | null>>
}

export const CoinsContext = createContext<CoinsContextType>({
  dates: null,
  setDates: () => {},
  values: null,
  setValues: () => {},
  coins: null,
  setCoins: () => {},
})

const clientSideEmotionCache = createEmotionCache()

const AppProviders = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const [coin, setCoin] = useState<string>('BTC - Controlled Vol')
  const [rollingWindow, setRollingWindow] = useState<number>(14)
  const [window, setWindow] = useState<number>(365)
  const [volatility, setVolatility] = useState<number>(0.2)
  const [showCandle, setShowCandle] = useState<boolean>(false)
  const [pro, setPro] = useState<boolean>(false)
  const [studyCase, setStudyCase] = useState<number>(1)
  const [dates, setDates] = useState<Date[] | null>(null)
  const [values, setValues] = useState<number[][] | null>(null)
  const [coins, setCoins] = useState<string[] | null>(null)

  const fetchDaily = async () => {
    const target = `/daily_prices_for_jesus.csv`
    try {
      let dailyData = await d3.csv(target)
      dailyData = parseData(dailyData)

      const coins = Object.keys(dailyData[0]).filter((key) => key !== 'date')
      const dates = dailyData.map((obj) => obj.date).filter((date) => date !== null) as unknown as Date[]

      const arrayOfArrays = coins.map((coin) => {
        const prices = dailyData.map((obj) => parseFloat(obj[coin]) || 0)
        return prices
      })

      const coinNames: string[] = dailyData.reduce<string[]>((acc, obj) => {
        const keys = Object.keys(obj).filter((key) => key !== 'date')
        return [...acc, ...keys]
      }, [])

      const uniqueCoinNames = Array.from(new Set(coinNames))

      setCoins(uniqueCoinNames.map((coin) => coin.slice(0, -4)))
      setDates(dates)
      setValues(arrayOfArrays)
    } catch (error) {
      console.error('Error fetching data :', error)
    }
  }

  useEffect(() => {
    fetchDaily()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            <CoinsContext.Provider value={{ dates, setDates, values, setValues, coins, setCoins }}>
              <RainbowKit>{children}</RainbowKit>
            </CoinsContext.Provider>
          </ProContext.Provider>
        </OptionsContext.Provider>
      </CacheProvider>
    </MetaMaskUIProvider>
  )
}

export default AppProviders
