/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'

import ActionCard from '@/components/ActionCard'
import Chart from '@/components/Chart/Index'
import RebalancingResults from '@/components/RebalancingResults'
import VaultsInfo from '@/components/VaultsInfo'
import Card from '@/components/common/Card'
import ContractReads from '@/hooks/useContractReads'

import CollateralsTable from '../CollateralsTable'
import TradesTable from '../TradesTable'

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

interface PerformanceData {
  sharpe: number
  cagr: number
  dd_max: string
}

interface NewPerformance {
  raw: PerformanceData
  scaled: PerformanceData
}

const Home = () => {
  const { InMaintenance } = ContractReads()
  const [prices, setPrices] = useState<number[][]>([])
  const [dates, setDates] = useState<Date[]>([])
  const [performanceData, setPerformanceData] = useState<NewPerformance | null>(null)
  // const [coins, setCoins] = useState<string[]>([])

  let status = false

  const data = InMaintenance().data as [boolean, number]
  if (data) {
    status = data[0] as boolean
  }

  const handlePerformanceUpdate = (data: NewPerformance) => {
    setPerformanceData(data)
  }

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

      // const coinNames: string[] = dailyData.reduce<string[]>((acc, obj) => {
      //   const keys = Object.keys(obj).filter((key) => key !== 'date')
      //   return [...acc, ...keys]
      // }, [])

      // const uniqueCoinNames = Array.from(new Set(coinNames))

      // setCoins(uniqueCoinNames.map((coin) => coin.slice(0, -4)))
      setDates(dates)
      setPrices(arrayOfArrays)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchDaily()
  }, [])

  return (
    <>
      <div className={`grid grid-cols-11 ${status ? 'mt-[15vh]' : 'mt-[10vh]'}`}>
        <div className="p-[.5vw] col-span-8">
          {prices.length > 0 ? (
            <Chart
              coins={['BTC', 'BTC 20%', 'ETH', 'PEPE']}
              prices={prices}
              dates={dates}
              onPerformanceUpdate={handlePerformanceUpdate}
            />
          ) : (
            <Card className="w-full h-full flex justify-center">
              <p className="text-3xl">Loading...</p>
            </Card>
          )}
          <Card className=" flex justify-between w-full mt-[2vh]">
            <CollateralsTable />
            <TradesTable />
          </Card>
        </div>
        <div className="p-[.5vw] col-span-3">
          <ActionCard coins={['BTC', 'BTC 20%', 'ETH', 'PEPE']} />
          <RebalancingResults results={performanceData} />
          <VaultsInfo />
        </div>
      </div>
    </>
  )
}

export default Home
