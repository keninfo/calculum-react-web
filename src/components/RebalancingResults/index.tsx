import React, { useContext } from 'react'

import Card from '@/components/common/Card'
import { CoinsContext } from '@/contexts/CoinsContext'
import { useOptionsStore } from '@/store/useOptionsStore'
import { useStrategyStore } from '@/store/useStrategyStore'
import {
  pct_change,
  calculateScaledReturnsLeverage,
  cummax,
  safeRound,
  calculateMean,
  calculateStd,
  cumprod,
} from '@/utils/chartComputations'
import { cutStringToFirstSpace } from '@/utils/formatters'

import Calendar from './Calendar'
import Info from './Info'

const RebalancingResults = () => {
  const { window, rollingWindow, studyCase, volatility } = useOptionsStore()
  const { coin, strategy } = useStrategyStore()
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

    if (coin == 'PEPE Smoothcoin') {
      cutCoinName = 'MPEPE'
    }
    if (coin == 'ETH Smoothcoin') {
      cutCoinName = 'ETH'
    }
    if (coin == 'BTC Smoothcoin 3X') {
      cutCoinName = 'BTC'
    }
    if (coin == 'BTC Smoothcoin') {
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

  const differenceSharpe = scaledSharpe - rawSharpe
  const differenceSharpeString = `${differenceSharpe > 0 ? '+' : ''}${differenceSharpe.toLocaleString('US')}`

  console.log(differenceSharpeString)

  // CAGR ---------------------------------------------------------------------------------------------------------

  const dFReturnsCumRet = cumprod(dFReturns)
  const dFReturnsScaledCumRet = cumprod(dFReturnsScaled)

  const rawCAGR = safeRound((dFReturnsCumRet[dFReturnsCumRet.length - 1] ** (1 / years) - 1) * 100, 2)
  const scaledCAGR = safeRound((dFReturnsScaledCumRet[dFReturnsScaledCumRet.length - 1] ** (1 / years) - 1) * 100, 2)

  const differenceCAGR = scaledCAGR - rawCAGR
  const differenceCAGRString = `${differenceCAGR > 0 ? '+' : ''}${differenceCAGR.toLocaleString('US')}%`

  console.log(differenceCAGRString)

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

  const differenceDDMax = Number(scaledDDMax) - Number(rawDDMax)
  const differenceDDMaxString = `${differenceDDMax > 0 ? '+' : ''}${differenceDDMax.toLocaleString('US')}%`

  console.log(differenceDDMaxString)

  return (
    <>
      {values && (
        <Card className="min-h-fit w-full !bg-transparent md:!p-0 [&_p]:text-left" title="Product Metrics">
          <Calendar title={strategy + ' ' + coin} color="primary" />
          <Calendar title={coin + ' Raw'} color="offWhite" />
          <div className="mt-5 flex items-center justify-between">
            <Info title={'Live Trading'} color="offWhite" />
            <Info title={`In and Out Sample`} color="offWhite" />
          </div>
        </Card>
      )}
    </>
  )
}

export default RebalancingResults
