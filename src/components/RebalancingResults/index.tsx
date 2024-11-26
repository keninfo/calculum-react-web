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

const RebalancingResults = () => {
  const { window, rollingWindow, studyCase, volatility } = useOptionsStore()
  const { coin } = useStrategyStore()
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

  // CAGR ---------------------------------------------------------------------------------------------------------

  const dFReturnsCumRet = cumprod(dFReturns)
  const dFReturnsScaledCumRet = cumprod(dFReturnsScaled)

  const rawCAGR = safeRound((dFReturnsCumRet[dFReturnsCumRet.length - 1] ** (1 / years) - 1) * 100, 2)
  const scaledCAGR = safeRound((dFReturnsScaledCumRet[dFReturnsScaledCumRet.length - 1] ** (1 / years) - 1) * 100, 2)

  const differenceCAGR = scaledCAGR - rawCAGR
  const differenceCAGRString = `${differenceCAGR > 0 ? '+' : ''}${differenceCAGR.toLocaleString('US')}%`

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

  return (
    <>
      {values && (
        <Card className="h-fit w-full !bg-transparent md:!p-0 [&_p]:text-left" title="Product Metrics">
          <p className="text-offWhite">Sharpe Ratio</p>
          <p className="mt-2 text-xs text-grey">
            smBTC: <b className={`text-md ${scaledSharpe < 0 ? 'text-offWhite' : 'text-offWhite'}`}>{scaledSharpe}</b>
          </p>
          <p className="text-xs text-grey">
            BTC: <b className={`text-md ${rawSharpe < 0 ? 'text-offWhite' : 'text-offWhite'}`}>{rawSharpe}</b>
          </p>

          <p className="text-xs text-grey">
            Difference:{' '}
            <b className={`text-md ${differenceSharpe > 0 ? 'text-spring' : 'text-fire'}`}>{differenceSharpeString}</b>
          </p>
          <p className="mt-4 border-t border-t-grey pt-4 text-offWhite">CAGR</p>
          <p className="mt-2 text-xs text-grey">
            smBTC: <b className={`text-md ${scaledCAGR < 0 ? 'text-offWhite' : 'text-offWhite'}`}>{scaledCAGR}%</b>
          </p>
          <p className="text-xs text-grey">
            BTC: <b className={`text-md ${rawCAGR < 0 ? 'text-offWhite' : 'text-offWhite'}`}>{rawCAGR}%</b>
          </p>

          <p className="text-xs text-grey">
            Difference:{' '}
            <b className={`text-md ${differenceCAGR > 0 ? 'text-spring' : 'text-fire'}`}>{differenceCAGRString}</b>
          </p>
          <p className="mt-4 border-t border-t-grey pt-4 text-offWhite">Largest Drawdown</p>
          <p className="mt-2 text-xs text-grey">
            smBTC:{' '}
            <b className={`text-md ${Number(scaledDDMax) < 0 ? 'text-offWhite' : 'text-offWhite'}`}>{scaledDDMax}%</b>
          </p>
          <p className="text-xs text-grey">
            BTC: <b className={`text-md ${Number(rawDDMax) < 0 ? 'text-offWhite' : 'text-offWhite'}`}>{rawDDMax}%</b>
          </p>

          <p className="text-xs text-grey">
            Difference:{' '}
            <b className={`text-md ${differenceDDMax > 0 ? 'text-spring' : 'text-fire'}`}>{differenceDDMaxString}</b>
          </p>
        </Card>
      )}
    </>
  )
}

export default RebalancingResults
