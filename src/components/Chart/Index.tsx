'use client'

import React, { useEffect, useMemo, useState } from 'react'

import dynamic from 'next/dynamic'

import {
  pct_change,
  calculateScaledReturns,
  calculateCumulativeReturns,
  filterByDate,
  calculateRolling,
} from './chartComputations'

import * as d3 from 'd3'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })
const formatTime = d3.utcFormat('%B %d, %Y')
let filter = [[], []]

const layout = {
  paper_bgcolor: 'transparent',
  plot_bgcolor: 'transparent',
  legend: {
    font: {
      color: 'white',
    },
  },
  xaxis: {
    showgrid: false,
    // zeroline: false,
    visible: false,
  },
  yaxis: {
    showgrid: false,
    // zeroline: false,
    visible: false,
  },
}

const Chart = ({
  period,
  dates,
  prices,
  window,
  volatility,
  selectedCoin,
  hourly,
}: {
  period: Date[]
  dates: Date[]
  prices: number[]
  window: number
  volatility: number
  selectedCoin: string
  hourly: boolean
}) => {
  const [start, setStart] = useState<string | null>()
  const [end, setEnd] = useState<string | null>()
  const [periods_per_year, setPeriod] = useState<number>(0)
  const [rolling_window, setRollling] = useState<number>(0)
  const [target_vol, setVol] = useState<number>(0)
  const [filteredDates, setFilteredDates] = useState<string[]>([])
  const [filteredPrices, setFilteredPrices] = useState<string[]>([])
  const [cumulativeReturnsScaled, setCumulativeReturnsScaled] = useState<number[]>([])
  const [cumulativeReturns_ret, setCumulativeReturns_ret] = useState<number[]>([])
  const [rolled, setRolled] = useState<number[]>([])

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
    setStart(period[0] ? formatTime(period[0]) : null)
    setEnd(period[1] ? formatTime(period[1]) : null)
  }, [period])

  useEffect(() => {
    if (dates && prices) {
      filter = filterByDate(prices, dates, start, end)
    }

    setFilteredPrices(filter[0])
    setFilteredDates(filter[1])
  }, [end, start, dates, prices])

  useEffect(() => {
    Calculations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredPrices, rolling_window, periods_per_year, target_vol, period])

  const Calculations = () => {
    const percentageChange = pct_change(filteredPrices)
    const scaledReturns = calculateScaledReturns(percentageChange, rolling_window, periods_per_year, target_vol)
    setCumulativeReturnsScaled(calculateCumulativeReturns(scaledReturns))
    setCumulativeReturns_ret(calculateCumulativeReturns(percentageChange))

    setRolled(calculateRolling(percentageChange, rolling_window))

    for (let i = 0; i < rolled.length; i++) {
      rolled[i] *= Math.sqrt(periods_per_year)
    }
  }

  const trace = useMemo(() => {
    return [
      {
        name: `${selectedCoin}USDT - ${volatility * 100}% volatility `,
        x: filteredDates.map((date: string | number | Date) => new Date(date)) as Date[],
        y: cumulativeReturnsScaled as number[],
        type: 'scatter',
        line: {
          color: 'white',
        },
        showlegend: false,
      },
      {
        name: `${selectedCoin}USDT`,
        x: filteredDates.map((date: string | number | Date) => new Date(date)) as Date[],
        y: cumulativeReturns_ret as number[],
        type: 'scatter',
        line: {
          color: '#9C061F',
        },
        showlegend: false,
      },
    ]
  }, [filteredDates, cumulativeReturnsScaled, cumulativeReturns_ret, selectedCoin, volatility])

  return (
    <>
      <div className="w-full">
        <Plot
          data={trace as never}
          layout={layout as never}
          style={{ height: '100%' }}
          config={{ displayModeBar: false, displaylogo: false, responsive: true }}
        />
      </div>
    </>
  )
}

export default Chart
