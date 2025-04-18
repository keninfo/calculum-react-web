'use client'

import React, { useEffect, useMemo, useState } from 'react'

import dynamic from 'next/dynamic'

import { useAccount } from 'wagmi'

import ChartsContainer from '@/components/ChartsContainer/Index'
import MarketTransactions from '@/components/MarketTransactions'
import Positions from '@/components/Positions'
import ProductMetrics from '@/components/ProductMetrics'
import MomentumMetrics from '@/components/ProductMetrics/MomentumMetrics'
import StrategyInfoTitle from '@/components/StrategyInfoTitle'
import TradeBox from '@/components/TradeBox'
import Transactions from '@/components/Transactions'
import Card from '@/components/common/Card'
import TVAttribution from '@/components/common/TVAttribution'
import { useNavbarStore } from '@/store/useNavbarStore'
import { useProStore } from '@/store/useProStore'
import { useStrategyStore } from '@/store/useStrategyStore'

import LongShortChart from '../ChartsContainer/Charts/LongShort'
import { LearnMore } from './components/learn-more'

import { twMerge } from 'tailwind-merge'

const Dashboard = () => {
  const { pro, setPro } = useProStore()
  const { coin, setCoin, strategy, setStrategy } = useStrategyStore()
  const [selected, setSelected] = useState<number>(1)
  const { isConnected } = useAccount()
  const { navbarHeight } = useNavbarStore()
  const [loading, setLoading] = useState(true)

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
    setTimeout(() => setLoading(false), 1000) // Simulating loading delay
  }, [])

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

  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>
  }

  return (
    <>
      {/* DESKTOP */}
      <div className={`grid-cols-12 gap-4 px-5 md:grid`} style={{ marginTop: navbarHeight }}>
        <div className={`col-span-12 flex w-full flex-col md:col-span-9`}>
          <StrategyInfoTitle />
        </div>
        <div className={`flex flex-col ${coin !== 'BTC' && coin !== 'USDC' ? 'col-span-12' : 'col-span-9'}`}>
          {strategy == 'Momentum' && <TVChartContainer />}
          {strategy == 'Smoothcoin' && <ChartsContainer />}

          <LongShortChart />
          <TVAttribution />

          {(coin == 'BTC' || coin == 'USDC') && (
            <Card className="my-2 mt-4 h-full min-h-fit w-full bg-[#3B3B3B]">
              <ul className="flex items-center justify-start gap-10 border-b border-payne">
                {isConnected && (
                  <>
                    <li className="text-lg">
                      <button
                        onClick={() => setSelected(2)}
                        className={twMerge('pb-2', selected === 2 && 'border-b-2 border-primary text-primary')}
                      >
                        Positions
                      </button>
                    </li>
                    <li className="text-lg">
                      <button
                        onClick={() => setSelected(3)}
                        className={twMerge('pb-2', selected === 3 && 'border-b-2 border-primary text-primary')}
                      >
                        Transaction History
                      </button>
                    </li>
                  </>
                )}
                <li className="text-lg">
                  <button
                    onClick={() => setSelected(0)}
                    className={twMerge('pb-2', selected === 0 && 'border-b-2 border-primary text-primary')}
                  >
                    Metrics
                  </button>
                </li>
                <li className="text-lg">
                  <button
                    onClick={() => setSelected(1)}
                    className={twMerge('pb-2', selected === 1 && 'border-b-2 border-primary text-primary')}
                  >
                    Transactions
                  </button>
                </li>
              </ul>
              {selected == 0 && strategy == 'Momentum' && <MomentumMetrics />}
              {selected == 0 && strategy == 'Smoothcoin' && <ProductMetrics />}
              {selected == 1 && <MarketTransactions />}
              {selected == 2 && <Positions />}
              {selected == 3 && <Transactions />}
            </Card>
          )}
        </div>
        {(coin == 'BTC' || coin == 'USDC') && (
          <div className="relative col-span-3 flex h-full flex-col gap-4">
            <div className="sticky top-0 space-y-4" style={{ top: navbarHeight || 0 }}>
              <TradeBox />
              <LearnMore />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Dashboard
