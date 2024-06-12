'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from 'react'

import { OptionsContext } from '@/components/AppProviders'
import Card from '@/components/common/Card'
import { OHCL } from '@/public/ohcl'

import ChartOptions from '../ChartOptions/Index'
import RoC from './Charts/RoC'
import RollingVol from './Charts/RollingVol'

const Chart = ({ prices, dates }: { prices: number[][]; dates: Date[] }) => {
  const [showSecondChart, setShowSecondChart] = useState<boolean>(true)
  const { coin, setVolatility } = useContext(OptionsContext)

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
    if (coin == 'BTC') {
      setVolatility(0.6)
    }
    if (coin == 'BTC 20%') {
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
      <Card className="w-full !p-0 !pt-[3vw] !pl-[1vw]">
        <ChartOptions />
        <RoC dates={dates} seriesData1={getCoinArray(0)} seriesData2={getCoinArray(0)} ohcl={getOHCL()} />
      </Card>
      <Card className={`w-full !p-0 !pl-[1vw] !pb-[2vh]`}>
        {showSecondChart && <RollingVol dates={dates} seriesData={getCoinArray(0)} />}
        <div className={`w-full flex justify-end pt-[2vh] pr-[1vw]`}>
          <button className="border py-[.5vh] px-[1vw] text-xs hover:scale-105" onClick={toggleSecondChart}>
            {showSecondChart ? 'Hide' : 'Show'}
          </button>
        </div>
      </Card>
    </>
  )
}

export default Chart
