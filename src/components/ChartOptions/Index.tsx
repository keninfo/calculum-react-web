import React, { useContext } from 'react'

import { OptionsContext, ProContext } from '@/components/AppProviders'

import RebalancingResults from '../RebalancingResults'
import Card from '../common/Card'
import CaseStudies from './CaseStudies'
import CoinSelect from './CoinSelect'
import SetWindow from './SetWindow'
import ShowCandle from './ShowCandle'

const ChartOptions = ({ prices, guide = false }: { prices: number[][]; guide?: boolean }) => {
  const { volatility, rollingWindow, studyCase } = useContext(OptionsContext)
  const { pro } = useContext(ProContext)

  return (
    <>
      {/* DESKTOP */}
      <Card className="hidden | md:block w-full mb-[2vh] relative">
        <div className="flex justify-between items-center">
          <p className="text-greySmoke text-left text-sm">Asset:</p>
          <CoinSelect />
        </div>
        <div className="flex justify-between items-center mt-[1vh]">
          <p className="text-greySmoke text-left text-sm">Case Studies:</p>
          <CaseStudies />
        </div>
        <div className="flex justify-between items-center mt-[1vh]">
          <p className="text-greySmoke text-left text-sm">Days:</p>
          {studyCase == 0 && <SetWindow />}
          {studyCase == 1 && (
            <p className="px-[1vw] py-0.5 h-fit w-fit text-sm border rounded-lg bg-smoke text-greySmoke text-left">
              04/01/2021
            </p>
          )}
          {studyCase == 2 && (
            <p className="px-[1vw] py-0.5 h-fit w-fit text-sm border rounded-lg bg-smoke text-greySmoke text-left">
              10/01/2023
            </p>
          )}
        </div>
        {pro && (
          <>
            <div className="flex justify-between items-center mt-[1vh]">
              <p className="text-greySmoke text-left text-sm">Volatility:</p>
              <p className="px-[1vw] py-0.5 h-fit w-fit text-sm border  bg-smoke text-greySmoke text-left rounded-lg">
                {volatility * 100}%
              </p>
            </div>
            <div className="flex justify-between items-center mt-[1vh]">
              <p className="text-greySmoke text-left text-sm">Rolling Window:</p>
              <p className="px-[1vw] py-0.5 h-fit w-fit text-sm border  bg-smoke text-greySmoke text-left rounded-lg">
                {rollingWindow} days
              </p>
            </div>
            {pro && !guide && <RebalancingResults data={prices} />}
          </>
        )}
      </Card>

      {/* MOBILE */}
      <div className="w-full pl-[2vw] | md:hidden">
        <div className="w-full grid grid-cols-2 items-center mt-[6vh] px-6">
          <div className="col-span-1 mr-[2vw]">
            <select
              className="px-10 py-0.5 h-fit w-full text-sm border bg-smoke text-white text-left"
              id="cryptoCoin"
              value={'BETA'}
            >
              <option key={1} value={'BETA'}>
                {'BETA'}
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
            {studyCase == 0 && <SetWindow />}
            {studyCase == 1 && (
              <p className="px-[2vw] py-0.5 h-fit w-full text-sm border  bg-smoke text-greySmoke text-left">
                04/01/2021
              </p>
            )}
            {studyCase == 2 && (
              <p className="px-[2vw] py-0.5 h-fit w-full text-sm border  bg-smoke text-greySmoke text-left">
                10/01/2023
              </p>
            )}
          </div>
        </div>
        <div className="w-fit mx-auto block text-center mt-[2vw]">
          <p className="text-greySmoke">Case Studies:</p>
          <CaseStudies />
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
            <span className="text-sm">BTC (Raw Price)</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-[2vw] h-1 bg-carmesi"></div>
            <p className="text-carmesi text-sm">BTC - Vol Target</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChartOptions
