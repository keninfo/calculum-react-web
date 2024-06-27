import React, { useContext } from 'react'

import { OptionsContext } from '@/components/AppProviders'
import {
  pct_change,
  calculateScaledReturns,
  calculateCumulativeReturns,
  cummax,
  safeRound,
} from '@/components/ChartsContainer/chartComputations'
import Card from '@/components/common/Card'

import CaseStudies from '../ChartOptions/CaseStudies'
import CoinSelect from '../ChartOptions/CoinSelect'
import SetWindow from '../ChartOptions/SetWindow'

const RebalancingResults = ({ data }: { data: number[][] }) => {
  const { window, rollingWindow, volatility, coin, studyCase } = useContext(OptionsContext)

  let selectedWindow = window
  let years = 1

  if (studyCase == 1) {
    selectedWindow = 1138
  } else if (studyCase == 2) {
    selectedWindow = 224
  }

  if (selectedWindow == 30) {
    years = 0.08219178
  } else if (selectedWindow == 60) {
    years = 0.16438356
  } else if (selectedWindow == 90) {
    years = 0.24657534
  } else if (selectedWindow == 1138) {
    years = 3.11780822
  } else if (selectedWindow == 224) {
    years = 0.61369863
  }

  const getCoinArray = (amount: number) => {
    let index = 0
    if (coin == 'PEPE') {
      index = 14
    }
    if (coin == 'ETH') {
      index = 1
    }
    return data[index].slice(-amount)
  }

  if (data.length <= 0) {
    return (
      <Card className="w-full h-full flex justify-center" title="LOADING...">
        <></>
      </Card>
    )
  }
  const periods = 365 // only for daily, have to change if hourly

  const filteredPrices = getCoinArray(selectedWindow + 1)

  const percentageChange = pct_change(filteredPrices)
  percentageChange[0] = 0

  const scaledReturns = calculateScaledReturns(percentageChange, rollingWindow, periods, volatility)
  const scaledReturnsLimited = scaledReturns.map((value) => (value ? Math.min(value, 1) : 0))
  const cumulativeReturnsScaled = calculateCumulativeReturns(
    percentageChange.map((returnValue, index) => returnValue * scaledReturnsLimited[index]),
  )

  // const rawSharpe = safeRound(
  //   (calculateMean(percentageChange) / calculateStd(percentageChange)) * Math.sqrt(periods),
  //   2,
  // )

  // const scaledSharpe = safeRound(
  //   (calculateMean(cumulativeReturnsScaled) / calculateStd(cumulativeReturnsScaled)) * Math.sqrt(periods),
  //   2,
  // )

  const cumulativeReturns = calculateCumulativeReturns(percentageChange)
  const cumMaxRaw = cummax(cumulativeReturns)
  const cumMaxScaled = cummax(cumulativeReturnsScaled)

  const dividedRaw = cumulativeReturns.map((value: number, index: number) => {
    return value / cumMaxRaw[index]
  })
  const dividedScaled = cumulativeReturnsScaled.map((value: number, index: number) => {
    return value / cumMaxScaled[index]
  })

  const subtractedRaw = dividedRaw.map((value: number) => value - 1)
  const subtractedScaled = dividedScaled.map((value: number) => value - 1)

  const absValuesRaw = subtractedRaw.map((value: number) => Math.abs(value))
  const absValuesScaled = subtractedScaled.map((value: number) => Math.abs(value))

  const sortedRaw = absValuesRaw.sort((a: number, b: number) => b - a)
  const sortedScaled = absValuesScaled.sort((a: number, b: number) => b - a)

  const rawCAGR = safeRound((cumulativeReturns[cumulativeReturns.length - 1] ** (1 / years) - 1) * 100, 2)
  const scaledCAGR = 0
  // const scaledCAGR = safeRound(
  //   (cumulativeReturnsScaled[cumulativeReturnsScaled.length - 1] ** (1 / years) - 1) * 100,
  //   2,
  //)

  const rawDDMax = `-${(sortedRaw[0] * 100).toFixed(1)}`
  const scaledDDMax = `-${(sortedScaled[0] * 100).toFixed(1)}`

  return (
    <Card className="w-full h-fit mt-[2vh]" title="REBALANCED RESULTS">
      {/* <p>
        Sharpe Ratio, Raw: <b>{rawSharpe}</b>
      </p>
      <p>
        Constant Volatility: <b>{scaledSharpe}</b>
      </p> */}

      <p className="mt-[2vh]">
        CAGR, Raw: <b>{rawCAGR}%</b>
      </p>
      <p>
        Constant Volatility: <b>{scaledCAGR}%</b>
      </p>

      <p className="mt-[2vh]">
        Largest Drawdown, Raw: <b>{rawDDMax}%</b>
      </p>
      <p>
        Constant Volatility: <b>{scaledDDMax}%</b>
      </p>
      <div className="w-full mt-[3vh]  space-y-[1vh]">
        <div className="block space-y-1 w-fit">
          <p className="text-greySmoke text-left text-sm">Asset:</p>
          <CoinSelect />
        </div>
        <div className="block space-y-1  w-fit">
          <p className="text-greySmoke text-left text-sm">Case Studies:</p>
          <CaseStudies />
        </div>
        <div className="block space-y-1  w-fit">
          <p className="text-greySmoke text-left text-sm">Days:</p>
          {studyCase == 0 && <SetWindow />}
          {studyCase == 1 && (
            <p className="px-[1vw] py-0.5 h-fit w-fit text-sm border  bg-smoke text-greySmoke text-left">04/01/2021</p>
          )}
          {studyCase == 2 && (
            <p className="px-[1vw] py-0.5 h-fit w-fit text-sm border  bg-smoke text-greySmoke text-left">10/01/2023</p>
          )}
        </div>
      </div>
    </Card>
  )
}

export default RebalancingResults
