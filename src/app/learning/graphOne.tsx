'use client'

import React, { useContext, useEffect, useState } from 'react'

import { OptionsContext } from '@/components/AppProviders'
import VolScaling from '@/components/ChartsContainer/Charts/VolScaling'

import * as d3 from 'd3'
import { timeParse } from 'd3-time-format'

const parseDate = timeParse('%Y-%m-%d')
const formatTime = d3.utcFormat('%B %d, %Y')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseData = (data: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((obj: any) => {
    const { ['']: dateString, ...rest } = obj
    const date = dateString ? parseDate(dateString) : null
    const formattedDate = date ? formatTime(date) : null
    return { date: formattedDate, ...rest }
  })
}

const GraphOne = () => {
  const [prices, setPrices] = useState<number[][]>([])
  const [dates, setDates] = useState<Date[]>([])
  const { coin, setVolatility } = useContext(OptionsContext)

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

      setDates(dates)
      setPrices(arrayOfArrays)
    } catch (error) {
      console.error('Error fetching data :', error)
    }
  }

  useEffect(() => {
    fetchDaily()
  }, [])

  const getCoinArray = (amount: number) => {
    let index = 0
    if (coin == 'PEPE') {
      index = 14
      setVolatility(0.6)
    }
    if (coin == 'ETH') {
      index = 1
      setVolatility(0.3)
    }
    if (coin == 'BTC - High Vol') {
      setVolatility(0.6)
    }
    if (coin == 'BTC - Controlled Vol') {
      setVolatility(0.2)
    }
    return prices[index].slice(-amount)
  }

  return (
    <>
      {prices.length > 0 && (
        <div className="bg-smoke p-[5vh] ">
          <VolScaling dates={dates} seriesData={getCoinArray(0)} />
        </div>
      )}
    </>
  )
}

export default GraphOne
