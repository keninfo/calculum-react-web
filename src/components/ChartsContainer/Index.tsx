'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from 'react'

import { OptionsContext, ProContext } from '@/components/AppProviders'
import Card from '@/components/common/Card'
import { OHCL } from '@/public/ohcl'

import RoC from './Charts/RoC'
import RollingVol from './Charts/RollingVol'

const Chart = ({ prices, dates }: { prices: number[][]; dates: Date[] }) => {
  const [showSecondChart, setShowSecondChart] = useState<boolean>(true)
  const { coin, setVolatility } = useContext(OptionsContext)
  const { pro } = useContext(ProContext)

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

  const toggleSecondChart = () => {
    setShowSecondChart(!showSecondChart)
  }

  const getOHCL = () => {
    let index = 0
    if (coin == 'PEPE') {
      index = 2
    }
    if (coin == 'ETH') {
      index = 1
    }
    return OHCL[index]
  }

  return (
    <>
      <Card className="relative w-full !p-0 !py-[2vh] !pr-[3vw] | md:!px-[3vw]">
        <p className="hidden | md:block absolute top-1/2 -left-[45px] -rotate-90 text-white text-sm">
          Return on Capital (%)
        </p>
        <RoC dates={dates} seriesData1={getCoinArray(0)} seriesData2={getCoinArray(0)} ohcl={getOHCL()} />
      </Card>
      {pro && (
        <Card className={`w-full !p-0 !py-[2vh] !pr-[3vw] | md:!px-[2vw]`}>
          <div className={`w-full flex justify-between items-center py-[3vh] | md:pb-[4vh] md:pt-[3vh]`}>
            <div className="flex items-center space-x-2 w-fit ml-[6vw] | md:ml-0">
              <p className="text-white text-2xl">Rolling Volatility </p>
            </div>
            <button className="border py-[.5vh] px-[1vw] text-xs hover:scale-105 | mr:ml-0" onClick={toggleSecondChart}>
              {showSecondChart ? 'Hide' : 'Show'}
            </button>
          </div>
          {showSecondChart && <RollingVol dates={dates} seriesData={getCoinArray(0)} />}
        </Card>
      )}
    </>
  )
}

export default Chart
