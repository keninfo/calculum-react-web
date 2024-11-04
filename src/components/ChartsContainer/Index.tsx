'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAutoAnimate } from '@formkit/auto-animate/react'

import React, { useContext, useState, useEffect } from 'react'

import Card from '@/components/common/Card'
import { CoinsContext } from '@/contexts/CoinsContext'
import { OptionsContext } from '@/contexts/OptionsContext'
import { useProStore } from '@/store/useProStore'
import { cutStringToFirstSpace } from '@/utils/formatters'

import ChartOptions from '../ChartOptions/Index'
import RoC from './Charts/RoC'
import RollingVol from './Charts/RollingVol'

const Chart = () => {
  const [showSecondChart, setShowSecondChart] = useState<boolean>(true)
  const { coin, setVolatility, strategy } = useContext(OptionsContext)

  const { pro } = useProStore()
  const { dates, values, coins } = useContext(CoinsContext)
  const [parent] = useAutoAnimate()

  const coinStrategy = coin + ' ' + strategy

  useEffect(() => {
    let newVolatility = 0

    if (coinStrategy === 'PEPE Smoothcoin') {
      newVolatility = 0.6
    } else if (coinStrategy === 'ETH Smoothcoin') {
      newVolatility = 0.3
    } else if (coinStrategy === 'BTC 3X Smoothcoin') {
      newVolatility = 0.6
    } else if (coinStrategy === 'BTC Smoothcoin') {
      newVolatility = 0.2
    }

    setVolatility(newVolatility)
  }, [coin, setVolatility, coinStrategy])

  const getCoinArray = () => {
    let cutCoinName = cutStringToFirstSpace(coin)
    if (coin === 'PEPE Smoothcoin') cutCoinName = 'MPEPE'
    if (coins) {
      const index = coins.indexOf(cutCoinName)
      return values ? values[index] : []
    }
    return []
  }

  const toggleSecondChart = () => {
    setShowSecondChart(!showSecondChart)
  }

  const getOHCL = () => {
    return []
  }

  return (
    <div ref={parent}>
      <Card className={`relative w-full !p-0 !py-[2vh] !pr-[3vw] md:!px-[3vw] ${pro ? '!rounded-b-none' : ''}`}>
        <div className="absolute right-5 top-5 z-20 hidden md:block">
          <ChartOptions />
        </div>
        <p className="absolute -left-[45px] top-1/2 hidden -rotate-90 text-sm text-white md:block">Return on Capital</p>
        {values && dates && (
          <RoC dates={dates ? dates : []} seriesData1={getCoinArray()} seriesData2={getCoinArray()} ohcl={getOHCL()} />
        )}
      </Card>
      {pro && (
        <Card className={`w-full !rounded-t-none !p-0 !py-[2vh] !pr-[3vw] md:!px-[2vw]`}>
          <div className={`flex w-full items-center justify-between py-[3vh] md:pb-[4vh] md:pt-[3vh]`}>
            <div className="ml-[6vw] flex w-fit items-center space-x-2 md:ml-0">
              <p className="text-2xl text-white">Rolling Volatility </p>
            </div>
            <button
              className="mr:ml-0 rounded-lg border px-[1vw] py-[.5vh] text-xs hover:scale-105"
              onClick={toggleSecondChart}
            >
              {showSecondChart ? 'Hide' : 'Show'}
            </button>
          </div>
          {showSecondChart && <RollingVol dates={dates ? dates : []} seriesData={getCoinArray()} />}
        </Card>
      )}
    </div>
  )
}

export default Chart
