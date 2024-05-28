/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SetStateAction } from 'react'
import React, { useContext, useState } from 'react'

import ActionCard from '@/components/ActionCard'
import { CoinContext } from '@/components/AppProviders'
import AssetInfo from '@/components/AssetInfo'
import CoinSelect from '@/components/ChartOptions/CoinSelect'
import Products from '@/components/CollateralsTable'
import CryptoIcon from '@/components/common/CryptoIcon'

import Chart from '../Chart/Index'
import ChartOptions from '../ChartOptions/Index'

const Home = () => {
  const { coin } = useContext(CoinContext)
  const [days, setDays] = useState<number>(2)
  const [volatility, setVolatility] = useState<number>(0.1)

  const submit = (data: { volatility: SetStateAction<number>; days: SetStateAction<number> }) => {
    setVolatility(data.volatility)
    setDays(data.days)
  }

  return (
    <>
      <div className="relative flex space-around space-x-10 mt-[2vh] ">
        <div className="w-full">
          <div className="flex justify-between items-start z-100">
            <h1 className="text-4xl pb-2">Overview</h1>
            <div className="flex justify-start items-center space-x-5 mt-[1vh]">
              <CryptoIcon coin={coin} className="size-[3vw]" type="white" />
              <CoinSelect coins={['ADA', 'BTC', 'ETH', 'BNB', 'SOL', 'MATIC', 'BCH']} />
            </div>
          </div>
          <div>
            <ChartOptions onSubmit={submit} />
            <Chart window={days} volatility={volatility} hourly={false} />
            <Products></Products>
          </div>
        </div>
        <div className="w-min">
          <ActionCard />
          <div className="my-10">
            <AssetInfo />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
