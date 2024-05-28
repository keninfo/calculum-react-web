'use client'

import React, { useContext, useEffect, useRef, useState } from 'react'

import { CoinContext } from '../AppProviders'
import { pct_change, calculateScaledReturns, calculateCumulativeReturns, calculateRolling } from './chartComputations'
import { ADA, BTC, ETH, BNB, SOL, MATIC, BCH } from './dummyData.ts'

import type { IChartApi, Time } from 'lightweight-charts'
import { createChart, ColorType } from 'lightweight-charts'

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

const Chart = ({ window, volatility, hourly }: { window: number; volatility: number; hourly: boolean }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<IChartApi | undefined>()

  const [periods_per_year, setPeriod] = useState<number>(0)
  const [rolling_window, setRollling] = useState<number>(0)
  const [target_vol, setVol] = useState<number>(0)

  const [cumulativeReturnsScaled, setCumulativeReturnsScaled] = useState<number[]>([])
  const [cumulativeReturns_ret, setCumulativeReturns_ret] = useState<number[]>([])
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
    if (!hourly) {
      setPeriod(365)
      setRollling(window)
    } else {
      setPeriod(365 * 24)
      setRollling(window * 24)
    }
  }, [hourly, window])

  useEffect(() => {
    Calculations()

    console.log(cumulativeReturns_ret)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolling_window, periods_per_year, target_vol, coin])

  const Calculations = () => {
    const fp = coinDataMap[coin].map((arr) => arr[4])
    setFilteredPrices(fp)
    const percentageChange = pct_change(filteredPrices)
    const scaledReturns = calculateScaledReturns(percentageChange, rolling_window, periods_per_year, target_vol)
    setCumulativeReturnsScaled(calculateCumulativeReturns(scaledReturns))
    setCumulativeReturns_ret(calculateCumulativeReturns(percentageChange))

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
        textColor: '#000',
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
        visible: false,
      },
      timeScale: {
        visible: false,
      },
    })

    // Chart for cumulativeReturnsScaled
    const lineSeries = chartInstance.current.addLineSeries({
      color: 'white', // Set the color for the line
    })

    const chartDataPrice: ChartDataPrice[] = coinDataMap[coin].map((data, index) => ({
      time: data[0] as Time,
      value: cumulativeReturnsScaled[index],
    }))

    lineSeries.setData(chartDataPrice)

    const candleSeries = chartInstance.current.addCandlestickSeries()

    const chartData: ChartData[] = coinDataMap[coin].map(([time, open, high, low, close]) => ({
      time: time as Time,
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
  }, [coin])

  return (
    <>
      <div ref={chartContainerRef} style={{ width: '100%', height: '400px' }} />
    </>
  )
}

export default Chart
