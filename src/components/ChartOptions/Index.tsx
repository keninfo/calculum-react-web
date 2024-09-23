import { useAutoAnimate } from '@formkit/auto-animate/react'

import React, { useContext } from 'react'

import { OptionsContext, ProContext } from '@/components/AppProviders'
import RebalancingResults from '@/components/RebalancingResults'
import Card from '@/components/common/Card'

import CaseStudies from './CaseStudies'
import CoinSelect from './CoinSelect'
import SetWindow from './SetWindow'

const ChartOptions = ({ guide = false }: { guide?: boolean }) => {
  const { volatility, rollingWindow, studyCase } = useContext(OptionsContext)
  const { pro } = useContext(ProContext)
  const [parent] = useAutoAnimate()

  return (
    <div>
      {/* DESKTOP */}
      <Card className="block w-full mb-[2vh] relative">
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
            <p className="px-[1vw] py-0.5 h-fit w-fit text-sm border rounded-md bg-smoke text-greySmoke text-left">
              04/01/2021
            </p>
          )}
          {studyCase == 2 && (
            <p className="px-[1vw] py-0.5 h-fit w-fit text-sm border rounded-md bg-smoke text-greySmoke text-left">
              10/01/2023
            </p>
          )}
        </div>
        <div ref={parent}>
          {pro && (
            <>
              <div className="flex justify-between items-center mt-[1vh]">
                <p className="text-greySmoke text-left text-sm">Volatility:</p>
                <p className="px-[1vw] py-0.5 h-fit w-fit text-sm border  bg-smoke text-greySmoke text-left rounded-md">
                  {volatility * 100}%
                </p>
              </div>
              <div className="flex justify-between items-center mt-[1vh]">
                <p className="text-greySmoke text-left text-sm">Rolling Window:</p>
                <p className="px-[1vw] py-0.5 h-fit w-fit text-sm border  bg-smoke text-greySmoke text-left rounded-md">
                  {rollingWindow} days
                </p>
              </div>
            </>
          )}
          {/* <div className="flex justify-between items-center mt-[1vh]">
          <p className="text-greySmoke text-left text-sm">Price Candlestick:</p>
          <ShowCandle />
        </div> */}
          {pro && !guide && <RebalancingResults />}
        </div>
      </Card>
    </div>
  )
}

export default ChartOptions
