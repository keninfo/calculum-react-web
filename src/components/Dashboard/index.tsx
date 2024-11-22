'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import React, { useContext, useEffect, useState } from 'react'

import ChartOptions from '@/components/ChartOptions/Index'
import ChartsContainer from '@/components/ChartsContainer/Index'
import Positions from '@/components/Positions'
import RebalancingResults from '@/components/RebalancingResults'
import StrategyInfoTitle from '@/components/StrategyInfoTitle'
import StrategyOptions from '@/components/StrategyOptions/Index'
import TradeBox from '@/components/TradeBox'
import Transactions from '@/components/Transactions'
import Card from '@/components/common/Card'
import { CoinsContext } from '@/contexts/CoinsContext'
import { useProStore } from '@/store/useProStore'
import { useStrategyStore } from '@/store/useStrategyStore'

import MomentumMetrics from '../RebalancingResults/MomentumMetrics'

const Dashboard = () => {
  const { pro, setPro } = useProStore()
  const { coin, setCoin, strategy, setStrategy } = useStrategyStore()
  const { dates, values } = useContext(CoinsContext)
  const [parent1] = useAutoAnimate()
  const [parent2] = useAutoAnimate()
  const [showing, setShowing] = useState<boolean>(true)

  useEffect(() => {
    const storedPro = localStorage.getItem('pro')
    const storedStrategy = localStorage.getItem('strategy')
    const storedCoin = localStorage.getItem('coin')
    if (storedPro !== null) {
      setPro(JSON.parse(storedPro))
    }
    if (storedStrategy !== null) {
      setStrategy(JSON.parse(storedStrategy))
    }
    if (storedCoin !== null) {
      setCoin(JSON.parse(storedCoin))
    }
  }, [setCoin, setPro, setStrategy])

  useEffect(() => {
    localStorage.setItem('pro', JSON.stringify(pro))
    localStorage.setItem('strategy', JSON.stringify(strategy))
    localStorage.setItem('coin', JSON.stringify(coin))
  }, [coin, pro, strategy])

  return (
    <>
      {/* DESKTOP */}
      <div className={`mt-[15.5vh] hidden grid-cols-11 gap-4 md:grid`}>
        <div
          className={`z-40 col-span-11 -my-[1rem] flex flex-col bg-cover bg-fixed bg-center ${pro ? "bg-[url('/bgPro.png')]" : "bg-[url('/bg.png')]"} md:sticky md:top-0`}
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

        <div className={`col-span-8 flex flex-col gap-4`} ref={parent1}>
          {values && dates ? (
            <ChartsContainer />
          ) : (
            <Card className="flex w-full justify-center" title="LOADING...">
              <></>
            </Card>
          )}
          <Transactions />
        </div>
        <div className="col-span-3 flex h-full flex-col gap-4" ref={parent2}>
          {values ? (
            <>
              <TradeBox />
              {pro && (
                <Card className="w-full">
                  {strategy == 'Smoothcoin' && <RebalancingResults />}
                  {strategy == 'Momentum' && <MomentumMetrics />}
                </Card>
              )}
              <Positions />
            </>
          ) : (
            <Card className="flex h-full w-full justify-center pt-[15vh]" title="LOADING...">
              <></>
            </Card>
          )}
        </div>
      </div>

      {/* MOBILE */}
      <div className="block w-screen space-y-5 px-5 md:hidden">
        <StrategyInfoTitle />
        {values && dates ? (
          <>
            <ChartsContainer />
            <ChartOptions />
          </>
        ) : (
          <Card className="flex h-full w-full justify-center" title="LOADING...">
            <></>
          </Card>
        )}

        <StrategyOptions />
        <TradeBox />
        <Positions />
        <Transactions />
        {showing && (
          <div className="fixed bottom-0 left-0 z-50 w-screen space-y-5 bg-citron p-6">
            <p className="w-full text-center text-xs text-eerie">
              For a better experience, please use your desktop browser to interact with our platform.
            </p>
            <button className="w-full text-center font-bold" onClick={() => setShowing(false)}>
              CLOSE
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Dashboard
