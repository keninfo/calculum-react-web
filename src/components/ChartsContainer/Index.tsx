'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAutoAnimate } from '@formkit/auto-animate/react'

import React, { useContext, useState, useEffect } from 'react'

import ChartOptions from '@/components/ChartOptions/Index'
import Card from '@/components/common/Card'
import { CoinsContext } from '@/contexts/CoinsContext'
import { useOptionsStore } from '@/store/useOptionsStore'
import { useProStore } from '@/store/useProStore'
import { useStrategyStore } from '@/store/useStrategyStore'
import { cutStringToFirstSpace } from '@/utils/formatters'

import Momentum from './Charts/Momentum'
import MomentumBTC from './Charts/MomentumBTC'
import RoC from './Charts/RoC'
import RollingVol from './Charts/RollingVol'

const Chart = () => {
  const [showSecondChart, setShowSecondChart] = useState<boolean>(true)
  const { coin, strategy } = useStrategyStore()
  const { setVolatility } = useOptionsStore()

  const { pro } = useProStore()
  const { dates, values, coins } = useContext(CoinsContext)
  const [parent] = useAutoAnimate()

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

  const getCoinArray = () => {
    let cutCoinName = cutStringToFirstSpace(coin)
    if (coin === '1000PEPE') cutCoinName = 'MPEPE'
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
    <>
      {strategy == `Smoothcoin` && (
        <div ref={parent}>
          <Card className={`relative w-full !p-0 !py-[2vh] !pr-[3vw] md:!px-[3vw]`}>
            <div className="absolute right-5 top-5 z-50 hidden md:block">
              <ChartOptions />
            </div>
            <p className="absolute -left-[45px] top-1/2 hidden -rotate-90 text-sm text-offWhite md:block">
              Return on Capital
            </p>
            {values && dates && (
              <RoC
                dates={dates ? dates : []}
                seriesData1={getCoinArray()}
                seriesData2={getCoinArray()}
                ohcl={getOHCL()}
              />
            )}
            <div className="mb-5 mt-10 flex w-full items-center justify-center space-x-10">
              <div className="flex w-fit items-center justify-end space-x-2 md:justify-start">
                <div className="h-1 w-[2vw] bg-primary"></div>
                <p className="text-xs text-primary md:text-sm">{strategy + ' ' + coin}</p>
              </div>
              <div className="flex items-center justify-end space-x-2 md:justify-start">
                <div className="h-1 w-[2vw] bg-offWhite"></div>
                <span className="text-xs md:text-sm">{coin} Raw Price</span>
              </div>
            </div>
          </Card>
          {pro && (
            <Card className={`mt-4 w-full !p-0 !py-[2vh] !pr-[3vw] md:!px-[2vw]`}>
              <div className={`flex w-full items-center justify-between py-[3vh]`}>
                <div className="ml-[6vw] flex w-fit items-center space-x-2 md:ml-0">
                  <p className="text-2xl text-offWhite">Rolling Volatility </p>
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
      )}
      {strategy == `Momentum` && (
        <div ref={parent}>
          <Card className={`relative w-full !p-0 !py-[2vh]`}>
            {coin == 'BTC' ? <MomentumBTC /> : <Momentum />}
            <div className="mb-5 mt-10 w-full items-center justify-center md:flex md:space-x-10">
              <div className="flex items-center justify-center space-x-2 md:justify-start">
                <div className="h-1 w-[2vw] bg-offWhite"></div>
                <span className="text-xs md:text-sm">{coin} Raw Price</span>
              </div>
              {coin !== 'BTC' && (
                <div className="flex items-center justify-center space-x-2 md:justify-start">
                  <div className="h-1 w-[2vw] bg-primary"></div>
                  <span className="text-xs text-primary md:text-sm">{strategy + ' ' + coin}</span>
                </div>
              )}
              {coin == 'BTC' && (
                <div className="flex items-center justify-center space-x-2 md:justify-start">
                  <div className="h-1 w-[2vw] bg-robin"></div>
                  <span className="text-xs text-robin md:text-sm">{strategy + ' ' + coin} Simulated Price</span>
                </div>
              )}
              {coin == 'BTC' && (
                <div className="flex items-center justify-center space-x-2 md:justify-start">
                  <div className="h-1 w-[2vw] bg-primary"></div>
                  <p className="text-xs text-primary md:text-sm">{strategy + ' ' + coin} Actual Price</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </>
  )
}

export default Chart
