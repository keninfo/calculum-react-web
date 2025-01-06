'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import React, { useContext, useEffect } from 'react'

import { useAccount } from 'wagmi'

import ChartOptions from '@/components/ChartOptions/Index'
import ChartsContainer from '@/components/ChartsContainer/Index'
import Positions from '@/components/Positions'
import ProductMetrics from '@/components/ProductMetrics'
import StrategyInfoTitle from '@/components/StrategyInfoTitle'
import StrategyOptions from '@/components/StrategyOptions/Index'
import TradeBox from '@/components/TradeBox'
import Transactions from '@/components/Transactions'
import Card from '@/components/common/Card'
import { CoinsContext } from '@/contexts/CoinsContext'
import { useProStore } from '@/store/useProStore'
import { useStrategyStore } from '@/store/useStrategyStore'

import MomentumMetrics from '../ProductMetrics/MomentumMetrics'
import TVNews from '../TVNews'
import TVTicker from '../TVTicker'
import TVAttribution from '../common/TVAttribution'

const Dashboard = () => {
  const { pro, setPro } = useProStore()
  const { coin, setCoin, strategy, setStrategy } = useStrategyStore()
  const { dates, values } = useContext(CoinsContext)
  const [parent1] = useAutoAnimate()
  const [parent2] = useAutoAnimate()
  const { isConnected } = useAccount()

  useEffect(() => {
    const storedStrategy = localStorage.getItem('strategy')
    const storedCoin = localStorage.getItem('coin')
    setPro(true)
    if (storedStrategy !== null) {
      setStrategy(JSON.parse(storedStrategy))
    }
    if (storedCoin !== null) {
      setCoin(JSON.parse(storedCoin))
    }
  }, [setCoin, setPro, setStrategy])

  useEffect(() => {
    localStorage.setItem('strategy', JSON.stringify(strategy))
    localStorage.setItem('coin', JSON.stringify(coin))
  }, [coin, pro, strategy])

  return (
    <>
      {/* DESKTOP */}
      <div className={`hidden grid-cols-11 gap-4 md:grid`}>
        <div
          className={`z-40 col-span-11 -my-4 flex flex-col bg-cover bg-fixed bg-center ${pro ? "bg-[url('/bgPro.png')]" : "bg-[url('/bg.png')]"} md:sticky md:top-0`}
        >
          <div
            className={`h-[1rem] w-full bg-cover bg-fixed bg-center ${pro ? "bg-[url('/bgPro.png')]" : "bg-[url('/bg.png')]"}`}
          ></div>
          <StrategyOptions />
          <div
            className={`h-[1rem] w-full bg-cover bg-fixed bg-center ${pro ? "bg-[url('/bgPro.png')]" : "bg-[url('/bg.png')]"}`}
          ></div>
        </div>
        <div className={`col-span-11 flex flex-col`}>
          <StrategyInfoTitle />
        </div>

        <div className={`col-span-8 flex flex-col`} ref={parent1}>
          {values && dates ? (
            <>
              <ChartsContainer />
              <TVAttribution />
            </>
          ) : (
            <Card className="flex w-full justify-center" title="LOADING...">
              <></>
            </Card>
          )}
          {isConnected && (
            <div className="mt-4 h-full">
              <Transactions />
            </div>
          )}
        </div>
        <div className="col-span-3 flex h-full flex-col gap-4" ref={parent2}>
          {values ? (
            <>
              <TradeBox />
              <Positions />
              {pro && coin == 'BTC' && (
                <Card className="h-full w-full">
                  {strategy == 'Smoothcoin' && <ProductMetrics small={true} />}
                  {strategy == 'Momentum' && <MomentumMetrics small={true} />}
                </Card>
              )}
            </>
          ) : (
            <Card className="flex h-full w-full justify-center pt-[15vh]" title="LOADING...">
              <></>
            </Card>
          )}
        </div>
        <div className="col-span-11 my-4 border-t border-dashed border-grey"></div>
        <div className="col-span-11 flex h-full flex-col">
          <Card className="w-full">
            <TVTicker />
          </Card>
        </div>
        <div className="col-span-11 flex h-[50vh] flex-col">
          <Card className="h-full w-full">
            <TVNews />
          </Card>
        </div>
      </div>

      {/* MOBILE */}
      <div className="-mt-5 block w-screen space-y-5 px-5 md:hidden">
        <StrategyOptions />
        <StrategyInfoTitle />
        {values && dates ? (
          <>
            <ChartsContainer />
            {strategy !== 'Momentum' && <ChartOptions />}
          </>
        ) : (
          <Card className="flex h-full w-full justify-center" title="LOADING...">
            <></>
          </Card>
        )}

        <TradeBox />
        <Positions />
        <Transactions />
        <div className="my-4 w-full border-t border-dashed border-grey"></div>
        <div className="w-full">
          <Card className="w-full">
            <TVTicker />
          </Card>
        </div>
        <div className="col-span-11 flex h-[50vh] flex-col">
          <Card className="h-full w-full">
            <TVNews />
          </Card>
        </div>
      </div>
    </>
  )
}

export default Dashboard
