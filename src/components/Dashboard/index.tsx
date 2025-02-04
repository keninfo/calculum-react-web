'use client'

import React, { useEffect, useMemo, useState } from 'react'

import dynamic from 'next/dynamic'

import { useAccount } from 'wagmi'

import ChartsContainer from '@/components/ChartsContainer/Index'
import Help from '@/components/Help'
import InitialPopup from '@/components/InitialPopup'
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

const Dashboard = () => {
  const { pro, setPro } = useProStore()
  const { coin, setCoin, strategy, setStrategy } = useStrategyStore()
  const [selected, setSelected] = useState<number>(1)
  const { isConnected } = useAccount()
  const { navbarHeight } = useNavbarStore()
  const [modal, setModal] = useState<boolean>(false)

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

  useEffect(() => {
    const hasAnswered = localStorage.getItem('userResponse')
    if (!hasAnswered) {
      setModal(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      {modal && <InitialPopup setModal={setModal} />}
      <div className={`hidden grid-cols-11 gap-4 md:grid`} style={{ marginTop: navbarHeight }}>
        <div className={`col-span-11 flex w-full flex-col`}>
          <StrategyInfoTitle />
        </div>
        <div className={`flex flex-col ${coin !== 'BTC' || !isConnected ? 'col-span-11' : 'col-span-8'}`}>
          {strategy == 'Momentum' && <TVChartContainer />}
          {strategy == 'Smoothcoin' && <ChartsContainer />}
          <TVAttribution />
          {isConnected && coin == 'BTC' && (
            <Card className="mt-4 h-full min-h-fit w-full">
              <ul className="flex items-center justify-start gap-10 border-b border-payne pt-2">
                <li className="text-lg">
                  <button
                    onClick={() => setSelected(2)}
                    className={`pb-6 ${selected === 2 ? 'border-b-2 border-primary text-primary' : ''}`}
                  >
                    Positions
                  </button>
                </li>
                <li className="text-lg">
                  <button
                    onClick={() => setSelected(3)}
                    className={`pb-6 ${selected === 3 ? 'border-b-2 border-primary text-primary' : ''}`}
                  >
                    Transaction History
                  </button>
                </li>
                <li className="text-lg">
                  <button
                    onClick={() => setSelected(0)}
                    className={`pb-6 ${selected === 0 ? 'border-b-2 border-primary text-primary' : ''}`}
                  >
                    Metrics
                  </button>
                </li>
                <li className="text-lg">
                  <button
                    onClick={() => setSelected(1)}
                    className={`pb-6 ${selected === 1 ? 'border-b-2 border-primary text-primary' : ''}`}
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
          {!isConnected && coin == 'BTC' && (
            <Card className="mt-4 h-full min-h-fit w-full">
              <ul className="grid grid-cols-4 border-b border-payne pt-2">
                <li className="col-span-1 flex justify-start text-lg">
                  <button
                    onClick={() => setSelected(0)}
                    className={`pb-6 ${selected === 0 ? 'border-b-2 border-primary text-primary' : ''}`}
                  >
                    Metrics
                  </button>
                </li>
                <li className="col-span-1 flex justify-start text-lg">
                  <button
                    onClick={() => setSelected(1)}
                    className={`pb-6 ${selected === 1 ? 'border-b-2 border-primary text-primary' : ''}`}
                  >
                    Transactions
                  </button>
                </li>
              </ul>
              {selected == 0 && strategy == 'Momentum' && <MomentumMetrics />}
              {selected == 0 && strategy == 'Smoothcoin' && <ProductMetrics />}
              {selected == 1 && <MarketTransactions />}
            </Card>
          )}
        </div>
        {coin == 'BTC' && isConnected && (
          <div className="relative col-span-3 flex h-full flex-col gap-4">
            <div className="sticky top-0 space-y-4" style={{ top: navbarHeight || 0 }}>
              <TradeBox />
              <Help />
            </div>
          </div>
        )}
      </div>

      {/* MOBILE */}
      <div className="-mt-5 block w-screen space-y-5 px-5 md:hidden" style={{ marginTop: navbarHeight }}>
        <StrategyInfoTitle />
        {strategy == 'Momentum' && <TVChartContainer />}
        {strategy == 'Smoothcoin' && <ChartsContainer />}
        <TVAttribution />
        {isConnected && (
          <>
            <TradeBox />
            <Help />
          </>
        )}
        <div className={`flex flex-col ${coin !== 'BTC' ? 'col-span-11' : 'col-span-8'}`}>
          {isConnected && coin == 'BTC' && (
            <Card className="h-full min-h-fit w-full">
              <ul className="flex items-center justify-around pt-2">
                <li className="col-span-1 flex justify-start text-xs">
                  <button
                    onClick={() => setSelected(2)}
                    className={`pb-2 ${selected === 2 ? 'border-b-2 border-primary text-primary' : ''}`}
                  >
                    Positions
                  </button>
                </li>
                <li className="col-span-1 flex justify-start text-xs">
                  <button
                    onClick={() => setSelected(3)}
                    className={`pb-2 ${selected === 3 ? 'border-b-2 border-primary text-primary' : ''}`}
                  >
                    Trade History
                  </button>
                </li>
                <li className="col-span-1 flex justify-start text-xs">
                  <button
                    onClick={() => setSelected(0)}
                    className={`pb-2 ${selected === 0 ? 'border-b-2 border-primary text-primary' : ''}`}
                  >
                    Metrics
                  </button>
                </li>
                <li className="col-span-1 flex justify-start text-xs">
                  <button
                    onClick={() => setSelected(1)}
                    className={`pb-2 ${selected === 1 ? 'border-b-2 border-primary text-primary' : ''}`}
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
          {!isConnected && coin == 'BTC' && (
            <Card className="mt-4 h-full min-h-fit w-full">
              <ul className="flex items-center justify-around pt-2">
                <li className="flex w-fit justify-start text-xs">
                  <button
                    onClick={() => setSelected(0)}
                    className={`pb-2 ${selected === 0 ? 'border-b-2 border-primary text-primary' : ''}`}
                  >
                    Metrics
                  </button>
                </li>
                <li className="flex w-fit justify-start text-xs">
                  <button
                    onClick={() => setSelected(1)}
                    className={`pb-2 ${selected === 1 ? 'border-b-2 border-primary text-primary' : ''}`}
                  >
                    Transactions
                  </button>
                </li>
              </ul>
              {selected == 1 && <MarketTransactions />}
              {selected == 0 && strategy == 'Momentum' && <MomentumMetrics />}
              {selected == 0 && strategy == 'Smoothcoin' && <ProductMetrics />}
            </Card>
          )}
        </div>
      </div>
    </>
  )
}

export default Dashboard
