import React, { useEffect, useState } from 'react'

import Card from '@/components/common/Card'
import { cummax, safeRound, calculateMean, calculateStd, cumprod } from '@/utils/chartComputations'

import * as d3 from 'd3'

const MomentumMetrics = () => {
  const [dates, setDates] = useState<Date[]>([])
  const [assetReturns, setAssetReturns] = useState<number[]>([])
  const [signalReturns, setSignalReturns] = useState<number[]>([])
  // const [assetCumReturns, setAssetCumReturns] = useState<number[]>([])
  // const [signalCumReturns, setSignalCumReturns] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const periods = 365 // only for daily, have to change if hourly
  const years = dates.length / 365

  const fetchMomentum = async () => {
    const staticDataSrc = '/momentum/btcUpdated.csv'

    try {
      const staticData = await d3.csv(staticDataSrc, (d) => ({
        date: d.date!,
        asset_return: +d.asset_return!,
        signal_return: +d.signal_return!,
        asset_cum_return: +d.asset_cum_return!,
        signal_cum_return: +d.signal_cum_return!,
      }))

      const dates = staticData.map((d) => new Date(d.date))
      const assetReturnsData = staticData.map((d) => d.asset_return)
      const signalReturnsData = staticData.map((d) => d.signal_return)
      // const assetCumReturnsData = staticData.map((d) => d.asset_cum_return)
      // const signalCumReturnsData = staticData.map((d) => d.signal_cum_return)

      setDates(dates)
      setAssetReturns(assetReturnsData)
      setSignalReturns(signalReturnsData)
      // setAssetCumReturns(assetCumReturnsData)
      // setSignalCumReturns(signalCumReturnsData)

      setLoading(false)
    } catch (error) {
      console.error('Error fetching signalCumReturns data:', error)
    }
  }

  useEffect(() => {
    fetchMomentum()
  }, [])

  // SHARPE ---------------------------------------------------------------------------------------------------------
  const rawSharpe = safeRound((calculateMean(assetReturns) / calculateStd(assetReturns)) * Math.sqrt(periods), 2)

  const scaledSharpe = safeRound((calculateMean(signalReturns) / calculateStd(signalReturns)) * Math.sqrt(periods), 2)

  const differenceSharpe = scaledSharpe - rawSharpe
  const differenceSharpeString = `${differenceSharpe > 0 ? '+' : ''}${differenceSharpe.toLocaleString('US')}`

  // CAGR ---------------------------------------------------------------------------------------------------------

  const dFReturnsCumRet = cumprod(assetReturns)
  const dFReturnsScaledCumRet = cumprod(signalReturns)

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
      {!loading && (
        <Card className="h-fit w-full !bg-transparent md:!p-0 [&_p]:text-left" title="Product Metrics">
          <p className="text-offWhite">Sharpe Ratio</p>
          <p className="mt-2 text-xs text-grey">
            moBTC: <b className={`text-md ${scaledSharpe < 0 ? 'text-offWhite' : 'text-offWhite'}`}>{scaledSharpe}</b>
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
            moBTC: <b className={`text-md ${scaledCAGR < 0 ? 'text-offWhite' : 'text-offWhite'}`}>{scaledCAGR}%</b>
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
            moBTC:{' '}
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

export default MomentumMetrics
