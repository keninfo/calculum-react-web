import React, { useEffect, useState } from 'react'

import { useOptionsStore } from '@/store/useOptionsStore'
import { useStrategyStore } from '@/store/useStrategyStore'
import { cummax, safeRound, calculateMean, calculateStd, cumprod } from '@/utils/chartComputations'

import * as d3 from 'd3'

const InfoMomentum = () => {
  const [dates, setDates] = useState<Date[]>([])
  const [returns, setReturns] = useState<number[][] | undefined>()
  const [signalReturns, setSignalReturns] = useState<number[][] | undefined>()
  const { window, volatility } = useOptionsStore()
  const { coin } = useStrategyStore()

  const periods = 365 // only for daily, have to change if hourly
  const years = dates.length / 365

  const fetchMomentum = async () => {
    let staticDataSrc = `mom_basket.csv`
    if (volatility == 0.6) {
      staticDataSrc = `mom_basket60.csv`
    }

    try {
      const staticData = await d3.csv(staticDataSrc, (d) => ({
        date: d.date!,
        closePrices: [+d[`close_price_BTCUSDT`]!, +d[`close_price_ETHUSDT`]!, +d[`close_price_SOLUSDT`]!],
        returns: [+d[`return_BTCUSDT`]!, +d[`return_ETHUSDT`]!, +d[`return_SOLUSDT`]!],
        signalReturns: [+d[`signal_return_BTCUSDT`]!, +d[`signal_return_ETHUSDT`]!, +d[`signal_return_SOLUSDT`]!],
        basketSignal: d.signal_basket_return!,
        cumSignal: d.cum_signal_basket_return!,
      }))

      const dates = staticData.map((d) => new Date(d.date))
      const returnsData = staticData.map((d) => d.returns)
      const signalReturnsData = staticData.map((d) => d.signalReturns)

      setDates(dates.slice(-window))
      setReturns(returnsData.slice(-window))
      setSignalReturns(signalReturnsData.slice(-window))
    } catch (error) {
      console.error('Error fetching signalCumReturns data:', error)
    }
  }

  useEffect(() => {
    fetchMomentum()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coin, window, volatility])

  if (returns && signalReturns) {
    let sum

    if (coin == 'BTC') {
      sum = signalReturns.map((value, index) => {
        return signalReturns[index][0]
      })
    }

    if (coin == 'BTC + ETH') {
      sum = signalReturns.map((value, index) => {
        return signalReturns[index][0] + signalReturns[index][1]
      })
    }

    if (coin == 'BTC + ETH + SOL') {
      sum = signalReturns.map((value, index) => {
        return signalReturns[index][0] + signalReturns[index][1] + signalReturns[index][2]
      })
    }

    const assetReturns = returns?.map((value) => {
      return value[0]
    })
    // SHARPE ---------------------------------------------------------------------------------------------------------
    const rawSharpe = safeRound((calculateMean(assetReturns) / calculateStd(assetReturns)) * Math.sqrt(periods), 2)

    const scaledSharpe = safeRound((calculateMean(sum) / calculateStd(sum)) * Math.sqrt(periods), 2)

    const differenceSharpe = scaledSharpe - rawSharpe
    const differenceSharpeString = `${differenceSharpe > 0 ? '+' : ''}${differenceSharpe.toLocaleString('US')}`

    // CAGR ---------------------------------------------------------------------------------------------------------

    const dFReturnsCumRet = cumprod(assetReturns)
    const dFReturnsScaledCumRet = cumprod(sum)

    const rawCAGR = safeRound((dFReturnsCumRet[dFReturnsCumRet.length - 1] ** (1 / years) - 1) * 100, 2)
    const scaledCAGR = safeRound((dFReturnsScaledCumRet[dFReturnsScaledCumRet.length - 1] ** (1 / years) - 1) * 100, 2)

    const differenceCAGR = scaledCAGR - rawCAGR
    const differenceCAGRString = `${differenceCAGR > 0 ? '+' : ''}${differenceCAGR.toLocaleString('US')}%`

    // DRAWDOWN ---------------------------------------------------------------------------------------------------------
    const cumMaxRaw = cummax(dFReturnsCumRet)
    const cumMasmcaled = cummax(dFReturnsScaledCumRet)

    const dividedRaw = dFReturnsCumRet.map((value: number, index: number) => {
      return value / cumMaxRaw[index]
    })
    const dividedScaled = dFReturnsScaledCumRet.map((value: number, index: number) => {
      return value / cumMasmcaled[index]
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
    const differenceDDMasmtring = `${differenceDDMax > 0 ? '+' : ''}${differenceDDMax.toLocaleString('US')}%`

    return (
      <>
        <div className="flex h-full w-full items-center justify-center !bg-transparent md:!p-0 [&_p]:text-left">
          <div>
            <p className="text-offWhite">Sharpe Ratio</p>
            <p className="mt-2 text-sm text-grey">
              Momentum:{' '}
              <b className={`text-md ${scaledSharpe < 0 ? 'text-offWhite' : 'text-offWhite'}`}>{scaledSharpe}</b>
            </p>
            <p className="text-sm text-grey">
              BTC raw: <b className={`text-md ${rawSharpe < 0 ? 'text-offWhite' : 'text-offWhite'}`}>{rawSharpe}</b>
            </p>

            <p className="text-sm text-grey">
              Difference:{' '}
              <b className={`text-md ${differenceSharpe > 0 ? 'text-[#51d780]' : 'text-fire'}`}>
                {differenceSharpeString}
              </b>
            </p>
            <p className="mt-4 border-t border-t-grey pt-4 text-offWhite">CAGR</p>
            <p className="mt-2 text-sm text-grey">
              Momentum: <b className={`text-md ${scaledCAGR < 0 ? 'text-offWhite' : 'text-offWhite'}`}>{scaledCAGR}%</b>
            </p>
            <p className="text-sm text-grey">
              BTC raw: <b className={`text-md ${rawCAGR < 0 ? 'text-offWhite' : 'text-offWhite'}`}>{rawCAGR}%</b>
            </p>

            <p className="text-sm text-grey">
              Difference:{' '}
              <b className={`text-md ${differenceCAGR > 0 ? 'text-[#51d780]' : 'text-fire'}`}>{differenceCAGRString}</b>
            </p>
            <p className="mt-4 border-t border-t-grey pt-4 text-offWhite">Largest Drawdown</p>
            <p className="mt-2 text-sm text-grey">
              Momentum:{' '}
              <b className={`text-md ${Number(scaledDDMax) < 0 ? 'text-offWhite' : 'text-offWhite'}`}>{scaledDDMax}%</b>
            </p>
            <p className="text-sm text-grey">
              BTC raw:{' '}
              <b className={`text-md ${Number(rawDDMax) < 0 ? 'text-offWhite' : 'text-offWhite'}`}>{rawDDMax}%</b>
            </p>

            <p className="text-sm text-grey">
              Difference:{' '}
              <b className={`text-md ${differenceDDMax > 0 ? 'text-[#51d780]' : 'text-fire'}`}>
                {differenceDDMasmtring}
              </b>
            </p>
          </div>
        </div>
      </>
    )
  }
}

export default InfoMomentum
