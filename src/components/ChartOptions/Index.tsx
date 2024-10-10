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
      <Card className="relative block w-full md:mb-[2vh]">
        <div className="flex items-center justify-between">
          <p className="text-left text-sm text-greySmoke">Asset:</p>
          <CoinSelect />
        </div>
        <div className="mt-[1vh] flex items-center justify-between">
          <p className="text-left text-sm text-greySmoke">Case Studies:</p>
          <CaseStudies />
        </div>
        <div className="mt-[1vh] flex items-center justify-between">
          <p className="text-left text-sm text-greySmoke">Days:</p>
          {studyCase == 0 && <SetWindow />}
          {studyCase == 1 && (
            <p className="h-fit w-fit rounded-md border bg-smoke px-[1vw] py-0.5 text-left text-sm text-greySmoke">
              04/01/2021
            </p>
          )}
          {studyCase == 2 && (
            <p className="h-fit w-fit rounded-md border bg-smoke px-[1vw] py-0.5 text-left text-sm text-greySmoke">
              10/01/2023
            </p>
          )}
        </div>
        <div ref={parent}>
          {pro && (
            <>
              <div className="mt-[1vh] flex items-center justify-between">
                <p className="text-left text-sm text-greySmoke">Volatility:</p>
                <p className="h-fit w-fit rounded-md border bg-smoke px-[1vw] py-0.5 text-left text-sm text-greySmoke">
                  {volatility * 100}%
                </p>
              </div>
              <div className="mt-[1vh] flex items-center justify-between">
                <p className="text-left text-sm text-greySmoke">Rolling Window:</p>
                <p className="h-fit w-fit rounded-md border bg-smoke px-[1vw] py-0.5 text-left text-sm text-greySmoke">
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
