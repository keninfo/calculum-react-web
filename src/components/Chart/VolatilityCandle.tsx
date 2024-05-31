'use client'

import React, { useContext, useEffect, useRef, useState } from 'react'

import { CoinContext } from '../AppProviders/index.tsx'
import { pct_change, calculateScaledReturns, calculateCumulativeReturns } from './chartComputations.js'
import { ADA, BTC, ETH, BNB, SOL, MATIC, BCH } from './dummyData.ts'

import type { IChartApi, Time } from 'lightweight-charts'
import { createChart, ColorType, LineStyle } from 'lightweight-charts'

interface ChartData {
  time: Time
  open: number
  high: number
  low: number
  close: number
}

const epochToDate = (epoch: number): string => {
  const date = new Date(epoch) // Convert from seconds to milliseconds
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0') // Months are zero-indexed
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}` // Format to 'YYYY-MM-DD'
}

const VolatilityCandle = ({ window, volatility, hourly }: { window: number; volatility: number; hourly: boolean }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<IChartApi | undefined>()

  const [periods_per_year, setPeriod] = useState<number>(0)
  const [rolling_window, setRollling] = useState<number>(0)
  const [target_vol, setVol] = useState<number>(0.2)

  const [crsOpen, setCrsOpen] = useState<number[]>([])
  const [crsHigh, setCrsHigh] = useState<number[]>([])
  const [crsLow, setCrsLow] = useState<number[]>([])
  const [crsClose, setCrsClose] = useState<number[]>([])

  const { coin } = useContext(CoinContext)

  const coinDataMap: { [key: string]: number[][] } = {
    ADA,
    BTC,
    ETH,
    BNB,
    SOL,
    MATIC,
    BCH,
  }

  useEffect(() => {
    setVol(volatility)
  }, [volatility])

  useEffect(() => {
    setPeriod(365)
    setRollling(window)
  }, [hourly, window])

  useEffect(() => {
    Calculations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolling_window, periods_per_year, target_vol, coin])

  const Calculations = () => {
    const openPrices = coinDataMap[coin].map((arr) => arr[1])
    const highPrices = coinDataMap[coin].map((arr) => arr[2])
    const lowPrices = coinDataMap[coin].map((arr) => arr[3])
    const closePrices = coinDataMap[coin].map((arr) => arr[4])

    const pcOpen = pct_change(openPrices)
    const pcHigh = pct_change(highPrices)
    const pcLow = pct_change(lowPrices)
    const pcClose = pct_change(closePrices)

    const scaledReturnsOpen = calculateScaledReturns(pcOpen, rolling_window, periods_per_year, target_vol)
    const scaledReturnsHigh = calculateScaledReturns(pcHigh, rolling_window, periods_per_year, target_vol)
    const scaledReturnsLow = calculateScaledReturns(pcLow, rolling_window, periods_per_year, target_vol)
    const scaledReturnsClose = calculateScaledReturns(pcClose, rolling_window, periods_per_year, target_vol)

    setCrsOpen(calculateCumulativeReturns(scaledReturnsOpen))
    setCrsHigh(calculateCumulativeReturns(scaledReturnsHigh))
    setCrsLow(calculateCumulativeReturns(scaledReturnsLow))
    setCrsClose(calculateCumulativeReturns(scaledReturnsClose))
  }

  useEffect(() => {
    if (!chartContainerRef.current) return

    chartInstance.current = createChart(chartContainerRef.current, {
      width: 600,
      height: 400,
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: 'transparent',
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
      rightPriceScale: {
        visible: true,
        borderVisible: false,
      },
      timeScale: {
        visible: true,
        borderVisible: false,
        fixLeftEdge: true,
      },
      crosshair: {
        vertLine: {
          // width: 8,
          color: '#C3BCDB44',
          style: LineStyle.Solid,
        },

        horzLine: {
          color: 'white',
        },
      },
    })

    const candleSeries = chartInstance.current.addCandlestickSeries({
      priceScaleId: 'right', // Ensure it shares the same price scale as the line series
    })

    const chartData: ChartData[] = coinDataMap[coin].map(([time, , , ,], index) => ({
      time: epochToDate(time),
      open: crsOpen[index],
      high: crsHigh[index],
      low: crsLow[index],
      close: crsClose[index],
    }))

    candleSeries.setData(chartData)

    return () => {
      if (chartInstance.current) {
        chartInstance.current.remove()
        chartInstance.current = undefined
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coin])

  return (
    <>
      <div ref={chartContainerRef} style={{ width: '100%', height: '400px' }} />
    </>
  )
}

export default VolatilityCandle
