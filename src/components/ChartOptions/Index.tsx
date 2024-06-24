import React, { useContext } from 'react'

import { OptionsContext, ProContext } from '@/components/AppProviders'

import CaseStudies from './CaseStudies'
import CoinSelect from './CoinSelect'
import SetWindow from './SetWindow'
import ShowCandle from './ShowCandle'

const ChartOptions = () => {
  const { volatility, rollingWindow, studyCase } = useContext(OptionsContext)
  const { pro } = useContext(ProContext)

  return (
    <>
      {/* DESKTOP */}
      <div className="hidden | md:flex justify-between items-start -mb-[5vh] w-full">
        <div className="w-full items-center">
          <div className="w-full flex justify-end items-end space-x-[1vw]">
            <div className="inline w-full">
              <div className="flex items-center space-x-2">
                <div className="w-[2vw] h-1 bg-white"></div>
                <span className="text-xs">BTC - RoC</span>
              </div>
              <div className="flex items-center space-x-2 w-fit">
                <div className="w-[2vw] h-1 bg-carmesi"></div>
                <p className="text-carmesi text-xs">BTC Vol Scaled - RoC </p>
              </div>
            </div>
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
              {studyCase == 0 && <SetWindow />}
              {studyCase == 1 && (
                <p className="px-10 py-0.5 h-fit w-full text-sm border  bg-smoke text-greySmoke text-left">
                  04/01/2021
                </p>
              )}
              {studyCase == 2 && (
                <p className="px-10 py-0.5 h-fit w-full text-sm border  bg-smoke text-greySmoke text-left">
                  10/01/2023
                </p>
              )}
            </div>
            <div className="block space-y-[1vh]">
              <p className="opacity-30 text-right text-sm">Case Studies:</p>
              <CaseStudies />
            </div>
          </div>
          {!pro && <div className="h-10 w-full"></div>}
          {pro && (
            <div className="w-full flex justify-end items-center space-x-[1vw] mt-[2vh]">
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
        <div className="w-full grid grid-cols-2 items-center mt-[6vh] px-6">
          <div className="col-span-1 mr-[2vw]">
            <select
              className="px-10 py-0.5 h-fit w-full text-sm border bg-smoke text-white text-left"
              id="cryptoCoin"
              value={'USDC vol'}
            >
              <option key={1} value={'USDC vol'}>
                {'USDC vol'}
              </option>
            </select>
          </div>
          <div className="col-span-1 ml-[2vw]">
            <CoinSelect />
          </div>
        </div>
        <div className="w-full grid grid-cols-2 items-center mt-[2vw] px-6">
          <div className="col-span-1 mr-[2vw]">
            <ShowCandle />
          </div>
          <div className="col-span-1 ml-[2vw]">
            <SetWindow />
          </div>
        </div>
        {!pro && <div className="h-10 w-full"></div>}
        {pro && (
          <div className="w-full grid grid-cols-2 items-center my-[6vw] px-6">
            <div className="col-span-1 mr-[2vw] text-center border text-greySmoke">
              <p>Volatility:</p>
              <p>{volatility * 100}%</p>
            </div>
            <div className="col-span-1 ml-[2vw] text-center border text-greySmoke">
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
