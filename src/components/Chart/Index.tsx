'use client'

import React, { useContext, useEffect, useRef, useState } from 'react'

import { CoinContext } from '../AppProviders'
import { pct_change, calculateScaledReturns, calculateCumulativeReturns, calculateRolling } from './chartComputations'

import type { IChartApi, Time } from 'lightweight-charts'
import { createChart, ColorType, LineStyle } from 'lightweight-charts'

interface ChartDataPrice {
  time: Time
  value: number
}

const formatDate = (date: Date): string => {
  const newDate = new Date(date)
  const year = newDate.getUTCFullYear()
  const month = String(newDate.getUTCMonth() + 1).padStart(2, '0')
  const day = String(newDate.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const Chart = ({
  window,
  volatility,
  coins,
  prices,
  dates,
}: {
  window: number
  volatility: number
  coins: string[]
  prices: number[][]
  dates: Date[]
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<IChartApi | undefined>()

  const [periods_per_year, setPeriod] = useState<number>(0)
  const [rolling_window, setRollling] = useState<number>(0)
  const [target_vol, setVol] = useState<number>(0.2)

  const { coin } = useContext(CoinContext)

  useEffect(() => {
    setVol(volatility)
  }, [volatility])

  useEffect(() => {
    setPeriod(365)
    setRollling(window)
  }, [window])

  useEffect(() => {
    if (!chartContainerRef.current) return

    const getCoinArray = () => {
      const index = coins.indexOf(coin)
      if (prices) {
        return prices[index]
      }
      return []
    }

    const filteredPrices = getCoinArray()
    const percentageChange = pct_change(filteredPrices)
    const scaledReturns = calculateScaledReturns(percentageChange, rolling_window, periods_per_year, target_vol)
    const cumulativeReturnsScaled = calculateCumulativeReturns(scaledReturns)
    const cumulativeReturns_ret = calculateCumulativeReturns(percentageChange)

    const rolled = calculateRolling(percentageChange, rolling_window)
    for (let i = 0; i < rolled.length; i++) {
      rolled[i] *= Math.sqrt(periods_per_year)
    }

    if (chartInstance.current) {
      chartInstance.current.remove()
    }

    chartInstance.current = createChart(chartContainerRef.current, {
      width: 700,
      height: 400,
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: 'white',
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
      leftPriceScale: {
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
          color: '#C3BCDB44',
          style: LineStyle.Solid,
        },
        horzLine: {
          color: 'white',
        },
      },
    })

    const lineSeries = chartInstance.current.addLineSeries({
      color: 'white',
      priceScaleId: 'left',
    })

    const chartDataPrice: ChartDataPrice[] = cumulativeReturnsScaled.map((data, index) => ({
      time: formatDate(dates[index]),
      value: data,
    }))

    lineSeries.setData(chartDataPrice)

    const lineSeries2 = chartInstance.current.addLineSeries({
      color: 'red',
      priceScaleId: 'right',
    })

    const chartDataPrice2: ChartDataPrice[] = cumulativeReturns_ret.map((data, index) => ({
      time: formatDate(dates[index]),
      value: data,
    }))

    lineSeries2.setData(chartDataPrice2)

    // Calculate the start date for the last 365 days
    const startDate = new Date(dates[dates.length - 1])
    startDate.setDate(startDate.getDate() - 365)
    const formattedStartDate = formatDate(startDate)
    const endDate = formatDate(dates[dates.length - 1])

    // Set the visible range for the time scale to show the last 365 days
    chartInstance.current.timeScale().setVisibleRange({ from: formattedStartDate, to: endDate })

    const leftLabel = document.createElement('div')
    leftLabel.style.position = 'absolute'
    leftLabel.style.top = '-30px'
    leftLabel.style.left = '10px'
    leftLabel.style.color = 'white'
    leftLabel.style.zIndex = '10'
    leftLabel.innerText = 'ROC (%)'

    const rightLabel = document.createElement('div')
    rightLabel.style.position = 'absolute'
    rightLabel.style.top = '-30px'
    rightLabel.style.right = '10px'
    rightLabel.style.color = 'white'
    rightLabel.style.zIndex = '10'
    rightLabel.innerText = 'Price'

    chartContainerRef.current.appendChild(leftLabel)
    chartContainerRef.current.appendChild(rightLabel)

    return () => {
      if (chartInstance.current) {
        chartInstance.current.remove()
        chartInstance.current = undefined
      }
    }
  }, [coin, coins, prices, dates, rolling_window, periods_per_year, target_vol])

  return (
    <>
      <div
        ref={chartContainerRef}
        style={{ width: '100%', height: '400px', position: 'relative', marginTop: '30px' }}
      />
    </>
  )
}

export default Chart
