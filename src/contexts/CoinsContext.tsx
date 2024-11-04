import type { ReactNode } from 'react'
import React, { createContext, useEffect, useState } from 'react'

import { parseData, parseStaticData } from '@/utils/fetchTokensData'

import * as d3 from 'd3'

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

export const CoinsProvider = ({ children }: { children: ReactNode }) => {
  const [dates, setDates] = useState<Date[] | null>(null)
  const [values, setValues] = useState<number[][] | null>(null)
  const [coins, setCoins] = useState<string[] | null>(null)

  const fetchDaily = async () => {
    const staticDataSrc = '/daily_prices_for_jesus.csv'
    const liveDataSrc = `/daily_prices_for_jesus.csv`

    try {
      let liveData = await d3.csv(liveDataSrc)
      liveData = parseData(liveData)

      let staticData = await d3.csv(staticDataSrc)
      staticData = parseStaticData(staticData)

      const lastTimestamp = staticData[staticData.length - 1].TIMESTAMP
      const lastDate = new Date(lastTimestamp)
      const filteredLiveData = liveData.filter((d) => new Date(d.TIMESTAMP) > lastDate)
      let fullData = staticData.concat(filteredLiveData)

      fullData = fullData.slice(0, fullData.length - 1)

      const coins = Object.keys(fullData[0]).filter((key) => key !== 'TIMESTAMP')
      const dates = fullData.map((obj) => obj.TIMESTAMP).filter((date) => date !== null) as unknown as Date[]

      const arrayOfArrays = coins.map((coin) => {
        const prices = fullData.map((obj) => parseFloat(obj[coin]) || 0)
        return prices
      })

      const coinNames: string[] = fullData.reduce<string[]>((acc, obj) => {
        const keys = Object.keys(obj).filter((key) => key !== 'TIMESTAMP')
        return [...acc, ...keys]
      }, [])

      const uniqueCoinNames = Array.from(new Set(coinNames))

      setCoins(uniqueCoinNames.map((coin) => coin.slice(0, -5)))
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
    <CoinsContext.Provider value={{ dates, setDates, values, setValues, coins, setCoins }}>
      {children}
    </CoinsContext.Provider>
  )
}
