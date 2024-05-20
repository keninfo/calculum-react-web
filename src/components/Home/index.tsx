/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react'

import { CoinContext } from '@/components/AppProviders'
import AssetInfo from '@/components/AssetInfo'
import Chart from '@/components/Chart/Index'
import CoinSelect from '@/components/ChartOptions/CoinSelect/Index'

import ActionCard from '../ActionCard'
import Products from '../CollateralsTable'
import Stats from '../Stats'
import CryptoIcon from '../common/CryptoIcon'

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

const Home = () => {
  const { coin } = useContext(CoinContext)
  const [daily, setDaily] = useState<number[][]>([])
  const [dailyDates, setDailyDates] = useState<Date[]>([])
  const [dailyCoins, setDailyCoins] = useState<string[]>([])

  const [start] = useState<Date>(new Date('2020-01-01'))
  const [end] = useState<Date>(new Date())
  const [days] = useState<number>(2)
  const [volatility] = useState<number>(0.1)

  const fetchDaily = async () => {
    try {
      let dailyData = await d3.csv('/daily_prices_for_jesus.csv')
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

      setDailyCoins(uniqueCoinNames.map((coin) => coin.slice(0, -4)))
      setDailyDates(dates)
      setDaily(arrayOfArrays)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchDaily()
  }, [])

  const getCoinArray = () => {
    const index = dailyCoins.indexOf(coin)
    if (daily) {
      return daily[index]
    }
    return [] // or handle the case when daily is undefined
  }

  return (
    <>
      <div className="relative flex space-around space-x-10">
        <div className="w-full ">
          <div className="flex justify-between items-start">
            <h1 className="text-4xl pb-2">Overview</h1>
            <div className="flex justify-start items-center space-x-5 mt-[1vh]">
              <CryptoIcon coin={coin} className="size-[3vw]" type="white" />
              <CoinSelect coins={['ADA', 'USDC', 'BTC', 'ETH', 'BNB', 'SOL', 'MATIC', 'BCH']} />
            </div>
          </div>
          <Chart
            period={[start, end]}
            dates={dailyDates}
            prices={getCoinArray()}
            window={days}
            volatility={volatility}
            selectedCoin={coin}
            hourly={false}
          />

          <Stats></Stats>
          <Products></Products>
        </div>
        <div className="w-min">
          <ActionCard />
          <div className="my-10">
            <AssetInfo />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
