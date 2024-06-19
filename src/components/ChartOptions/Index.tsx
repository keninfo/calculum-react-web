import React, { useContext } from 'react'

import { OptionsContext, ProContext } from '@/components/AppProviders'

import CoinSelect from './CoinSelect'
import SetWindow from './SetWindow'
import ShowCandle from './ShowCandle'

const ChartOptions = () => {
  const { volatility, rollingWindow } = useContext(OptionsContext)
  const { pro } = useContext(ProContext)

  return (
    <>
      {/* DESKTOP */}
      <div className="hidden | md:flex justify-between items-start -mb-[5vh] w-full pl-[2vw]">
        <div className="inline w-full">
          <div className="flex items-center space-x-2">
            <div className="w-[2vw] h-1 bg-white"></div>
            <span className="text-sm">BTC - Return on Capital (RoC)</span>
          </div>
          <div className="flex items-center space-x-2 w-fit">
            <div className="w-[2vw] h-1 bg-carmesi"></div>
            <p className="text-carmesi text-sm">BTC Vol Scaled - Return on Capital (RoC) </p>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full flex justify-end items-center space-x-[1vw] pr-[3vw]">
            <div className="block space-y-[1vh]">
              <p className="opacity-30 text-right text-sm">Show:</p>
              <ShowCandle />
            </div>
            <div className="block space-y-[1vh]">
              <p className="opacity-30 text-right text-sm">Asset:</p>
              <CoinSelect />
            </div>
            <div className="block space-y-[1vh]">
              <p className="opacity-30 text-right text-sm">Data History:</p>
              <SetWindow />
            </div>
          </div>
          {!pro && <div className="h-10 w-full"></div>}
          {pro && (
            <div className="w-full flex justify-end items-center space-x-[1vw] pr-[3vw] mt-[3vh]">
              <div className="flex text-greySmoke space-x-2">
                <p>Volatility:</p>
                <p>{volatility * 100}%</p>
              </div>
              <div className="flex text-greySmoke space-x-2">
                <p>Rolling Window:</p>
                <p>{rollingWindow} days</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE */}
      <div className="w-full pl-[2vw] | md:hidden">
        <div className="w-full flex justify-between items-center mt-[4vh] space-x-6 px-6">
          <div className="block space-y-[1vh]">
            <p className="opacity-30 text-left text-sm">Strategy:</p>
            <select
              className="px-10 py-0.5 h-fit w-fit text-sm border  bg-smoke text-white text-left"
              id="cryptoCoin"
              value={'USDC vol'}
            >
              <option key={1} value={'USDC vol'}>
                {'USDC vol'}
              </option>
            </select>
          </div>
          <div className="block space-y-[1vh]">
            <p className="opacity-30 text-left text-sm">Asset:</p>
            <CoinSelect />
          </div>
        </div>
        <div className="w-full flex justify-between items-center mt-[1vh] space-x-6 px-6">
          <div className="block space-y-[1vh]">
            <p className="opacity-30 text-left text-sm">Show:</p>
            <ShowCandle />
          </div>
          <div className="block space-y-[1vh]">
            <p className="opacity-30 text-left text-sm">Data History:</p>
            <SetWindow />
          </div>
        </div>
        {!pro && <div className="h-10 w-full"></div>}
        {pro && (
          <div className="w-full flex justify-around items-center space-x-[1vw] my-[3vh]">
            <div className="flex text-greySmoke space-x-2">
              <p>Volatility:</p>
              <p>{volatility * 100}%</p>
            </div>
            <div className="flex text-greySmoke space-x-2">
              <p>Rolling Window:</p>
              <p>{rollingWindow} days</p>
            </div>
          </div>
        )}
        <div className="block w-full">
          <div className="flex items-center justify-center  space-x-2">
            <div className="w-[2vw] h-1 bg-white"></div>
            <span className="text-sm">BTC - Return on Capital (RoC)</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-[2vw] h-1 bg-carmesi"></div>
            <p className="text-carmesi text-sm">BTC Vol Scaled - Return on Capital (RoC) </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChartOptions
