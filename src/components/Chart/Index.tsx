'use client'

import type { SetStateAction } from 'react'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { CoinContext } from '@/components/AppProviders'
import ChartOptions from '@/components/ChartOptions/Index'
import Card from '@/components/common/Card'

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

const Chart = ({ coins, prices, dates }: { coins: string[]; prices: number[][]; dates: Date[] }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<IChartApi | undefined>()

  const [periods_per_year, setPeriod] = useState<number>(0)
  const [rolling_window, setRollling] = useState<number>(0)
  const [target_vol, setVol] = useState<number>(0.2)
  const [volatility, setVolatility] = useState<number>(0.1)
  const [window, setDays] = useState<number>(2)
  const [last, setLast] = useState<number>(14)

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
        return prices[index].slice(-last)
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
        mode: 2,
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

    const datesFiltered = dates.slice(-last)
    const visibleRange = {
      from: formatDate(datesFiltered[0]) as Time,
      to: formatDate(datesFiltered[datesFiltered.length - 1]) as Time,
    }

    const lineSeries = chartInstance.current.addLineSeries({
      color: 'white',
      priceScaleId: 'left',
    })

    const chartDataPrice: ChartDataPrice[] = cumulativeReturnsScaled.map((data, index) => ({
      time: formatDate(datesFiltered[index]) as Time,
      value: data,
    }))

    lineSeries.setData(chartDataPrice)

    const lineSeries2 = chartInstance.current.addLineSeries({
      color: '#ef233c',
      priceScaleId: 'left',
    })

    const chartDataPrice2: ChartDataPrice[] = cumulativeReturns_ret.map((data, index) => ({
      time: formatDate(datesFiltered[index]) as Time,
      value: data,
    }))

    lineSeries2.setData(chartDataPrice2)

    // Set visible range after chart is created
    chartInstance.current.timeScale().setVisibleRange(visibleRange)

    const rightLabel = document.createElement('div')
    rightLabel.style.position = 'absolute'
    rightLabel.style.top = '-40px'
    rightLabel.style.left = '10px'
    rightLabel.style.color = 'white'
    rightLabel.style.zIndex = '1'
    rightLabel.innerText = 'ROC (%)'

    chartContainerRef.current.appendChild(rightLabel)

    return () => {
      if (chartInstance.current) {
        chartInstance.current.remove()
        chartInstance.current = undefined
      }
    }
  }, [coin, coins, prices, dates, rolling_window, periods_per_year, target_vol, last])

  const submit = (data: {
    volatility: SetStateAction<number>
    days: SetStateAction<number>
    dates: SetStateAction<number>
  }) => {
    setVolatility(data.volatility)
    setDays(data.days)
    setLast(data.dates)
  }

  return (
    <Card className="w-full p-[2vh] pr-0">
      <ChartOptions onSubmit={submit} coins={coins} />
      <div ref={chartContainerRef} style={{ width: '100%', height: '100%', position: 'relative', marginTop: '50px' }} />
    </Card>
  )
}

export default Chart
