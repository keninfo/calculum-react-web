import React, { useContext } from 'react'

import { OptionsContext } from '@/components/AppProviders'
import {
  pct_change,
  calculateScaledReturns,
  safeRound,
  calculateMean,
  calculateStd,
  cummax,
  calculateCumulativeReturns,
} from '@/components/ChartsContainer/chartComputations'
import Card from '@/components/common/Card'

import CoinSelect from '../ChartOptions/CoinSelect'
import SetWindow from '../ChartOptions/SetWindow'

const RebalancingResults = ({ data }: { data: number[][] }) => {
  const { window, rollingWindow, volatility, coin } = useContext(OptionsContext)

  let years = 1
  if (window == 30) {
    years = 0.08
  } else if (window == 60) {
    years = 0.16
  } else if (window == 90) {
    years = 0.25
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
      <Card className="w-full h-fit mt-[2vh]">
        <p className="text-2xl w-full text-center animate-pulse">Loading...</p>
      </Card>
    )
  }
  const periods = 365 // only for daily, have to change if hourly

  const filteredPrices = getCoinArray(window + rollingWindow)

  const percentageChange = pct_change(filteredPrices)
  const scaledReturns = calculateScaledReturns(percentageChange, rollingWindow, periods, volatility)
  const cumulativeReturnsScaled = calculateCumulativeReturns(scaledReturns)
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

  // const result_raw = absValues_raw.filter(value => !isNaN(value));
  // const result_scaled = absValues_scaled.filter(value => !isNaN(value));

  const sortedRaw = absValuesRaw.sort((a: number, b: number) => b - a)
  const sortedScaled = absValuesScaled.sort((a: number, b: number) => b - a)

  const rawSharpe = safeRound(
    (calculateMean(percentageChange) / (calculateStd(percentageChange) || 1)) * Math.sqrt(periods),
    2,
  )
  const rawCAGR = safeRound((cumulativeReturns[cumulativeReturns.length - 1] ** (1 / years) - 1) * 100, 2)
  const rawDDMax = `-${(sortedRaw[0] * 100).toFixed(1)}`

  const scaledSharpe = safeRound(
    (calculateMean(scaledReturns) / (calculateStd(scaledReturns) || 1)) * Math.sqrt(periods),
    2,
  )
  const scaledCAGR = safeRound(
    (cumulativeReturnsScaled[cumulativeReturnsScaled.length - 1] ** (1 / years) - 1) * 100,
    2,
  )
  const scaledDDMax = `-${(sortedScaled[0] * 100).toFixed(1)}`

  return (
    <Card className="w-full h-fit mt-[2vh]">
      <h2 className="text-xl  mb-4 text-carmesi">REBALANCED RESULTS</h2>
      <p>
        Sharpe Ratio, Raw: <b>{rawSharpe}</b>
      </p>
      <p>
        Constant Volatility: <b>{scaledSharpe}</b>
      </p>
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
      <div className="w-full flex justify-between items-center space-x-[1vw] mt-[3vh]">
        <div className="block space-y-[1vh]">
          <p className="opacity-30 text-left text-sm">Asset:</p>
          <CoinSelect />
        </div>
        <div className="block space-y-[1vh]">
          <p className="opacity-30 text-left text-sm">Data History:</p>
          <SetWindow />
        </div>
      </div>
    </Card>
  )
}

export default RebalancingResults
