import React, { useEffect, useRef, useContext } from 'react'

import { CoinContext } from '@/components/AppProviders'

import { ADA, BTC, ETH, BNB, SOL, MATIC, BCH } from './dummyData'

import type { IChartApi, Time } from 'lightweight-charts'
import { ColorType, createChart } from 'lightweight-charts'

interface ChartData {
  time: Time
  open: number
  high: number
  low: number
  close: number
}

const Index = () => {
  const chartContainerRef = useRef(null)
  const chartInstance = useRef<IChartApi | undefined>()
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
    if (!chartContainerRef.current) return

    chartInstance.current = createChart(chartContainerRef.current, {
      width: 600,
      height: 400,
      layout: {
        background: {
          type: ColorType.Solid,
          color: 'transparent',
        },
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
      <h3>Last 90 days</h3>
      <div ref={chartContainerRef} style={{ width: '100%', height: '400px' }} />
    </>
  )
}

export default Index
