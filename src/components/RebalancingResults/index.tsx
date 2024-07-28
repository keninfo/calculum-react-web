import React, { useContext } from 'react'

import { CoinsContext, OptionsContext } from '@/components/AppProviders'
import {
  pct_change,
  calculateScaledReturnsLeverage,
  cummax,
  safeRound,
  calculateMean,
  calculateStd,
  cumprod,
} from '@/components/ChartsContainer/chartComputations'
import Card from '@/components/common/Card'
import { cutStringToFirstSpace } from '@/utils/formatters'

const RebalancingResults = () => {
  const { window, rollingWindow, coin, studyCase, volatility } = useContext(OptionsContext)
  const { values, coins } = useContext(CoinsContext)

  let selectedWindow = window
  let years = 1

  if (studyCase == 1) {
    selectedWindow = 1171
  } else if (studyCase == 2) {
    selectedWindow = 258
  }

  if (selectedWindow == 30) {
    years = 0.08219178
  } else if (selectedWindow == 60) {
    years = 0.16438356
  } else if (selectedWindow == 90) {
    years = 0.24657534
  } else if (selectedWindow == 1171) {
    years = 3.20821918
  } else if (selectedWindow == 258) {
    years = 0.70684932
  }

  const getCoinArray = (amount: number) => {
    let index = 1

    let cutCoinName = cutStringToFirstSpace(coin)

    if (coin == 'PEPE') {
      cutCoinName = 'MPEPE'
    }
    if (coin == 'ETH') {
      cutCoinName = 'ETH'
    }
    if (coin == 'BTC - High Vol') {
      cutCoinName = 'BTC'
    }
    if (coin == 'BTC - Controlled Vol') {
      cutCoinName = 'BTC'
    }

    if (coins) {
      index = coins.indexOf(cutCoinName)
    }

    return values && coin ? values[index].slice(-amount) : []
  }

  const periods = 365 // only for daily, have to change if hourly

  const filteredPrices = getCoinArray(selectedWindow + 1)

  const dFReturns = pct_change(filteredPrices)
  dFReturns[0] = 0

  const filteredPricesForScaled = getCoinArray(selectedWindow + rollingWindow + 1)
  const dFReturnsForScaled = pct_change(filteredPricesForScaled)
  dFReturnsForScaled[0] = 0

  const leverage = calculateScaledReturnsLeverage(dFReturnsForScaled, rollingWindow, periods, volatility).slice(
    14,
    dFReturnsForScaled.length,
  )
  const leverageLimited = leverage.map((value) => (value ? Math.min(value, 1) : 0))
  const dFReturnsScaled = dFReturns.map((returnValue, index) => returnValue * leverageLimited[index])

  // SHARPE ---------------------------------------------------------------------------------------------------------
  const rawSharpe = safeRound((calculateMean(dFReturns) / calculateStd(dFReturns)) * Math.sqrt(periods), 2)

  const scaledSharpe = safeRound(
    (calculateMean(dFReturnsScaled) / calculateStd(dFReturnsScaled)) * Math.sqrt(periods),
    2,
  )

  // CAGR ---------------------------------------------------------------------------------------------------------

  const dFReturnsCumRet = cumprod(dFReturns)
  const dFReturnsScaledCumRet = cumprod(dFReturnsScaled)

  const rawCAGR = safeRound((dFReturnsCumRet[dFReturnsCumRet.length - 1] ** (1 / years) - 1) * 100, 2)
  const scaledCAGR = safeRound((dFReturnsScaledCumRet[dFReturnsScaledCumRet.length - 1] ** (1 / years) - 1) * 100, 2)

  // DRAWDOWN ---------------------------------------------------------------------------------------------------------
  const cumMaxRaw = cummax(dFReturnsCumRet)
  const cumMaxScaled = cummax(dFReturnsScaledCumRet)

  const dividedRaw = dFReturnsCumRet.map((value: number, index: number) => {
    return value / cumMaxRaw[index]
  })
  const dividedScaled = dFReturnsScaledCumRet.map((value: number, index: number) => {
    return value / cumMaxScaled[index]
  })

  const subtractedRaw = dividedRaw.map((value: number) => value - 1)
  const subtractedScaled = dividedScaled.map((value: number) => value - 1)

  const absValuesRaw = subtractedRaw.map((value: number) => Math.abs(value))
  const absValuesScaled = subtractedScaled.map((value: number) => Math.abs(value))

  const sortedRaw = absValuesRaw.sort((a: number, b: number) => b - a)
  const sortedScaled = absValuesScaled.sort((a: number, b: number) => b - a)

  const rawDDMax = `-${(sortedRaw[0] * 100).toFixed(1)}`
  const scaledDDMax = `-${(sortedScaled[0] * 100).toFixed(1)}`

  return (
    <>
      {values && (
        <Card className="w-full h-fit mt-[6vh] | md:!p-0" title="REBALANCED RESULTS">
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
          {/* <div className="w-full mt-[3vh]  space-y-[1vh]">
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
      </div> */}
        </Card>
      )}
    </>
  )
}

export default RebalancingResults
