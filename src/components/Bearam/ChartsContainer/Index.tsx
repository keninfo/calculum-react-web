'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'

import { useOptionsStore } from '@/store/useOptionsStore'
import { useStrategyStore } from '@/store/useStrategyStore'

import ChartOptions from '../ChartOptions/Index'
import AlphaOne from './Charts/AlphaOne'

const Chart = () => {
  const { coin, strategy } = useStrategyStore()
  const { setVolatility } = useOptionsStore()

  const coinStrategy = coin + ' ' + strategy

  useEffect(() => {
    let newVolatility = 0

    if (coinStrategy === '1000PEPE Smoothcoin' || coinStrategy === 'DOGE Smoothcoin') {
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

  return (
    <>
      {strategy == `Alpha One` && (
        <div>
          <div className="absolute right-20 top-5 z-50 hidden md:block">
            <ChartOptions />
          </div>
          <AlphaOne />
        </div>
      )}
      {strategy == `Alpha Two` && (
        <div>
          <div className="absolute right-20 top-5 z-50 hidden md:block">
            <ChartOptions />
          </div>
          <AlphaOne />
        </div>
      )}
      {strategy == `Alpha Three` && (
        <div>
          <div className="absolute right-20 top-5 z-50 hidden md:block">
            <ChartOptions />
          </div>
          <AlphaOne />
        </div>
      )}
    </>
  )
}

export default Chart
