'use client'

import React, { useContext, useEffect, useRef, useState } from 'react'

import { CoinContext } from '../AppProviders'
import { pct_change, calculateScaledReturns, calculateCumulativeReturns, calculateRolling } from './chartComputations'
import { ADA, BTC, ETH, BNB, SOL, MATIC, BCH } from './dummyData.ts'

import type { IChartApi, Time } from 'lightweight-charts'
import { createChart, ColorType, LineStyle } from 'lightweight-charts'

interface ChartDataPrice {
  time: Time
  value: number
}

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

const Chart = ({ window, volatility, hourly }: { window: number; volatility: number; hourly: boolean }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<IChartApi | undefined>()

  const [periods_per_year, setPeriod] = useState<number>(0)
  const [rolling_window, setRollling] = useState<number>(0)
  const [target_vol, setVol] = useState<number>(0.2)

  const [cumulativeReturnsScaled, setCumulativeReturnsScaled] = useState<number[]>([])
  // const [cumulativeReturns_ret, setCumulativeReturns_ret] = useState<number[]>([])
  const [filteredPrices, setFilteredPrices] = useState<number[]>([])
  const [rolled, setRolled] = useState<number[]>([])

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
    const fp = coinDataMap[coin].map((arr) => arr[1])
    setFilteredPrices(fp)
    const percentageChange = pct_change(filteredPrices)
    const scaledReturns = calculateScaledReturns(percentageChange, rolling_window, periods_per_year, target_vol)
    setCumulativeReturnsScaled(calculateCumulativeReturns(scaledReturns))
    // setCumulativeReturns_ret(calculateCumulativeReturns(percentageChange))

    setRolled(calculateRolling(percentageChange, rolling_window))

    for (let i = 0; i < rolled.length; i++) {
      rolled[i] *= Math.sqrt(periods_per_year)
    }
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

    // Chart for cumulativeReturnsScaled
    const lineSeries = chartInstance.current.addLineSeries({
      color: 'white', // Set the color for the line
      priceScaleId: 'right', // Ensure it shares the same price scale as the candlestick series
    })

    const chartDataPrice: ChartDataPrice[] = coinDataMap[coin].map((data, index) => ({
      time: epochToDate(data[0]),
      value: cumulativeReturnsScaled[index] * filteredPrices[index],
    }))

    lineSeries.setData(chartDataPrice)

    const candleSeries = chartInstance.current.addCandlestickSeries({
      priceScaleId: 'right', // Ensure it shares the same price scale as the line series
    })

    const chartData: ChartData[] = coinDataMap[coin].map(([time, open, high, low, close]) => ({
      time: epochToDate(time),
      open,
      high,
      low,
      close,
    }))

    candleSeries.setData(chartData)

    return () => {
      if (chartInstance.current) {
        chartInstance.current.remove()
        chartInstance.current = undefined
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coin, cumulativeReturnsScaled])

  return (
    <>
      <div ref={chartContainerRef} style={{ width: '100%', height: '400px' }} />
    </>
  )
}

export default Chart
