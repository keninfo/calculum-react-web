import { useFavicon } from '@uidotdev/usehooks'
import { useDocumentTitle } from '@uidotdev/usehooks'

import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { useOptionsStore } from '@/store/useOptionsStore'
import { useStrategyStore } from '@/store/useStrategyStore'

import Card from '../common/Card'
import ChartOptions from './ChartOptions/Index'
import ChartsContainer from './ChartsContainer/Index'
import CoinSelect from './CoinSelect'
import Footer from './Footer'
import Navbar from './Navbar'
import ProductMetrics from './ProductMetrics'
import StrategySelect from './StrategySelect'
import VolSelect from './VolSelect'

const Bearam = () => {
  const { setStrategy } = useStrategyStore()
  const { setWindow, setStudyCase } = useOptionsStore()
  const [favicon] = useState('/favicon.png')
  const [BTCRaw] = useState(true)
  const [ETHRaw] = useState(false)
  const [SOLRaw] = useState(false)

  useFavicon(favicon)
  useDocumentTitle('Bearam | Dashboard')

  useEffect(() => {
    setStrategy('Momentum')
    setWindow(0)
    setStudyCase(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="h-full w-screen bg-[#190b31]">
      <Image
        src="/bearambg.png"
        alt=""
        className="pointer-events-none fixed -top-1 right-0 z-0 w-screen bg-cover opacity-20"
        style={{ height: `calc(100vh + ${4}px)` }}
        width="1000"
        height="1000"
      />
      <div className="absolute z-50">
        <Navbar />
      </div>
      <div className={`z-20 h-full space-y-4 px-20 py-32`}>
        <Card className="flex h-20 w-full justify-between !bg-dark">
          <div className="flex w-full items-center justify-start space-x-5">
            <p className="text-xl text-grey">Strategy: </p>
            <StrategySelect />
            <CoinSelect />
            <p className="pl-6 text-xl text-grey">Volatility: </p>
            <VolSelect />
          </div>
          <ChartOptions />

          {/* <div className="flex w-full items-center justify-end space-x-5 [&_p]:text-xs">
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={BTCRaw} onChange={() => toggleState(setBTCRaw)} className="hidden" />
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-md border-2 ${BTCRaw ? 'border-[#f7931a] bg-[#f7931a]' : 'border-gray-400'
                  } cursor-pointer transition-colors duration-300 hover:border-offWhite`}
              >
                {BTCRaw && <div className="h-2.5 w-2.5 rounded bg-white" />}
              </div>
              <span className="text-gray-200">BTC raw</span>
              <div className="h-1 w-[2vw] bg-[#f7931a]"></div>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={ETHRaw} onChange={() => toggleState(setETHRaw)} className="hidden" />
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-md border-2 ${ETHRaw ? 'border-[#215CAF] bg-[#215CAF]' : 'border-gray-400'
                  } cursor-pointer transition-colors duration-300 hover:border-offWhite`}
              >
                {ETHRaw && <div className="h-2.5 w-2.5 rounded bg-white" />}
              </div>
              <span className="text-gray-200">ETH raw</span>
              <div className="h-1 w-[2vw] bg-[#215CAF]"></div>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={SOLRaw} onChange={() => toggleState(setSOLRaw)} className="hidden" />
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-md border-2 ${SOLRaw ? 'border-[#14F195] bg-[#14F195]' : 'border-gray-400'
                  } cursor-pointer transition-colors duration-300 hover:border-offWhite`}
              >
                {SOLRaw && <div className="h-2.5 w-2.5 rounded bg-white" />}
              </div>
              <span className="text-gray-200">SOL raw</span>
              <div className="h-1 w-[2vw] bg-[#14F195]"></div>
            </label>
          </div> */}
        </Card>
        <div className="grid h-4/5 grid-cols-12 gap-4">
          <Card className="col-span-10 h-full w-full !bg-dark">
            <ChartsContainer BTCRaw={BTCRaw} ETHRaw={ETHRaw} SOLRaw={SOLRaw} />
          </Card>
          <Card className="col-span-2 h-full w-full !bg-dark">
            <ProductMetrics />
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Bearam
