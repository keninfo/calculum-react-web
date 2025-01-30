'use client'

import { useMeasure } from '@uidotdev/usehooks'

import React, { useContext, useEffect, useMemo, useState } from 'react'

import dynamic from 'next/dynamic'

import { useAccount } from 'wagmi'

import ChartsContainer from '@/components/ChartsContainer/Index'
import Help from '@/components/Help'
import Positions from '@/components/Positions'
import StrategyInfoTitle from '@/components/StrategyInfoTitle'
import StrategyOptions from '@/components/StrategyOptions/Index'
import TradeBox from '@/components/TradeBox'
import Transactions from '@/components/Transactions'
import Card from '@/components/common/Card'
import TVAttribution from '@/components/common/TVAttribution'
import { CoinsContext } from '@/contexts/CoinsContext'
import { useProStore } from '@/store/useProStore'
import { useStrategyStore } from '@/store/useStrategyStore'

import MarketTransactions from '../MarketTransactions'
import ProductMetrics from '../ProductMetrics'
import MomentumMetrics from '../ProductMetrics/MomentumMetrics'

const Dashboard = () => {
  const { pro, setPro } = useProStore()
  const { coin, setCoin, strategy, setStrategy } = useStrategyStore()
  const { dates, values } = useContext(CoinsContext)
  const [selected, setSelected] = useState<number>(1)
  const { isConnected } = useAccount()
  const [ref, { height }] = useMeasure()

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

  useEffect(() => {
    setSelected(0)
  }, [isConnected])

  const TVChartContainer = useMemo(
    () =>
      dynamic(() => import('@/components/TVChartContainer').then((mod) => mod.TVChartContainer), {
        ssr: false,
      }),
    [],
  )

  return (
    <>
      {/* DESKTOP */}
      <div className={`hidden grid-cols-11 gap-4 md:grid`}>
        <div
          className={`z-40 col-span-11 -my-4 flex flex-col bg-cover bg-fixed bg-center ${pro ? "bg-[url('/bgPro.png')]" : "bg-[url('/bg.png')]"} md:sticky md:top-0`}
          ref={ref}
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
        <div className={`flex flex-col ${coin !== 'BTC' ? 'col-span-11' : 'col-span-8'}`}>
          {strategy == 'Momentum' && <TVChartContainer />}
          {strategy == 'Smoothcoin' && <ChartsContainer />}
          <TVAttribution />
          {isConnected && coin == 'BTC' && (
            <Card className="mt-4 h-full min-h-fit w-full">
              <ul className="grid grid-cols-4 border-b border-payne pt-2">
                <li className="col-span-1 flex justify-start text-lg">
                  <button
                    onClick={() => setSelected(0)}
                    className={`pb-6 ${selected === 0 ? 'border-b-2 border-primary text-primary' : ''}`}
                  >
                    Market Transactions
                  </button>
                </li>
                <li className="col-span-1 flex justify-center text-lg">
                  <button
                    onClick={() => setSelected(1)}
                    className={`pb-6 ${selected === 1 ? 'border-b-2 border-primary text-primary' : ''}`}
                  >
                    Metrics
                  </button>
                </li>
                <li className="col-span-1 flex justify-center text-lg">
                  <button
                    onClick={() => setSelected(2)}
                    className={`pb-6 ${selected === 2 ? 'border-b-2 border-primary text-primary' : ''}`}
                  >
                    My Positions
                  </button>
                </li>
                <li className="col-span-1 flex justify-end text-lg">
                  <button
                    onClick={() => setSelected(3)}
                    className={`pb-6 ${selected === 3 ? 'border-b-2 border-primary text-primary' : ''}`}
                  >
                    My Transaction History
                  </button>
                </li>
              </ul>
              {selected == 0 && <MarketTransactions />}
              {selected == 1 && strategy == 'Momentum' && <MomentumMetrics />}
              {selected == 1 && strategy == 'Smoothcoin' && <ProductMetrics />}
              {selected == 2 && <Positions />}
              {selected == 3 && <Transactions />}
            </Card>
          )}
          {!isConnected && coin == 'BTC' && (
            <Card className="mt-4 h-full min-h-fit w-full">
              <ul className="grid grid-cols-4 border-b border-payne pt-2">
                <li className="col-span-1 flex justify-start text-lg">
                  <button
                    onClick={() => setSelected(0)}
                    className={`pb-6 ${selected === 0 ? 'border-b-2 border-primary text-primary' : ''}`}
                  >
                    Market Transactions
                  </button>
                </li>
                <li className="col-span-1 flex justify-center text-lg">
                  <button
                    onClick={() => setSelected(1)}
                    className={`pb-6 ${selected === 1 ? 'border-b-2 border-primary text-primary' : ''}`}
                  >
                    Metrics
                  </button>
                </li>
              </ul>
              {selected == 0 && <MarketTransactions />}
              {selected == 1 && strategy == 'Momentum' && <MomentumMetrics />}
              {selected == 1 && strategy == 'Smoothcoin' && <ProductMetrics />}
            </Card>
          )}
        </div>
        {coin == 'BTC' && (
          <div className="relative col-span-3 flex h-full flex-col gap-4">
            <div className="sticky top-0 space-y-4" style={{ top: height || 0 }}>
              <TradeBox />
              <Help />
            </div>
          </div>
        )}
      </div>

      {/* MOBILE */}
      <div className="-mt-5 block w-screen space-y-5 px-5 md:hidden">
        <StrategyOptions />
        <StrategyInfoTitle />
        {values && dates ? (
          <>
            <TVChartContainer />
          </>
        ) : (
          <Card className="flex h-full w-full justify-center" title="LOADING...">
            <></>
          </Card>
        )}

        <TradeBox />
        <Positions />
        <Transactions />
        {/* <div className="my-4 w-full border-t border-dashed border-grey"></div>
        <div className="w-full">
          <Card className="w-full">
            <TVTicker />
          </Card>
        </div>
        <div className="col-span-11 flex h-[50vh] flex-col">
          <Card className="h-full w-full">
            <TVNews />
          </Card>
        </div> */}
      </div>
    </>
  )
}

export default Dashboard
