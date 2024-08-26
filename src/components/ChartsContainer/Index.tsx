'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAutoAnimate } from '@formkit/auto-animate/react'

import React, { useContext, useState, useEffect } from 'react'

import { CoinsContext, OptionsContext, ProContext } from '@/components/AppProviders'
import Card from '@/components/common/Card'
import { cutStringToFirstSpace } from '@/utils/formatters'

import RoC from './Charts/RoC'
import RollingVol from './Charts/RollingVol'

const Chart = () => {
  const [showSecondChart, setShowSecondChart] = useState<boolean>(true)
  const { coin, setVolatility } = useContext(OptionsContext)
  const { pro } = useContext(ProContext)
  const { dates, values, coins } = useContext(CoinsContext)
  const [parent] = useAutoAnimate()

  useEffect(() => {
    let newVolatility = 0

    if (coin === 'PEPE Smoothcoin') {
      newVolatility = 0.6
    } else if (coin === 'ETH Smoothcoin') {
      newVolatility = 0.3
    } else if (coin === 'BTC Smoothcoin 3X') {
      newVolatility = 0.6
    } else if (coin === 'BTC Smoothcoin') {
      newVolatility = 0.2
    }

    setVolatility(newVolatility)
  }, [coin, setVolatility])

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
      <Card className={`relative w-full !p-0 !py-[2vh] !pr-[3vw] | md:!px-[3vw] ${pro ? '!rounded-b-none ' : ''}`}>
        <p className="hidden | md:block absolute top-1/2 -left-[45px] -rotate-90 text-white text-sm">
          Return on Capital
        </p>
        {values && dates && (
          <RoC dates={dates ? dates : []} seriesData1={getCoinArray()} seriesData2={getCoinArray()} ohcl={getOHCL()} />
        )}
      </Card>
      {pro && (
        <Card className={`w-full !p-0 !py-[2vh] !pr-[3vw] !rounded-t-none | md:!px-[2vw]`}>
          <div className={`w-full flex justify-between items-center py-[3vh] | md:pb-[4vh] md:pt-[3vh]`}>
            <div className="flex items-center space-x-2 w-fit ml-[6vw] | md:ml-0">
              <p className="text-white text-2xl">Rolling Volatility </p>
            </div>
            <button
              className="border py-[.5vh] px-[1vw] text-xs rounded-lg hover:scale-105 | mr:ml-0"
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
