'use client'

import type { SetStateAction } from 'react'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { CoinContext } from '@/components/AppProviders'
import ChartOptions from '@/components/ChartOptions/Index'
import Card from '@/components/common/Card'

import { pct_change, calculateScaledReturns, calculateCumulativeReturns, calculateRolling } from './chartComputations'

import type { IChartApi, Time } from 'lightweight-charts'
import { createChart, ColorType } from 'lightweight-charts'

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

    if (chartContainerRef.current) {
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
          mode: 0,
          visible: true,
          borderVisible: false,
        },
        timeScale: {
          visible: true,
          borderVisible: false,
          fixLeftEdge: true,
        },
        crosshair: {
          horzLine: {
            visible: false,
            labelVisible: false,
          },
          vertLine: {
            visible: true,
            style: 0,
            width: 2,
            color: 'rgba(32, 38, 46, 0.1)',
            labelVisible: false,
          },
        },
        localization: {
          dateFormat: "dd MMMM 'yy",
        },
      })
    }

    const datesFiltered = dates.slice(-last)
    const visibleRange = {
      from: formatDate(datesFiltered[0]) as Time,
      to: formatDate(datesFiltered[datesFiltered.length - 1]) as Time,
    }

    const lineSeries = chartInstance.current?.addLineSeries({
      color: '#ef233c',
      priceScaleId: 'left',
    })

    const chartDataPrice: ChartDataPrice[] = cumulativeReturnsScaled.map((data, index) => ({
      time: formatDate(datesFiltered[index]) as Time,
      value: (data - 1) * 100,
    }))

    lineSeries?.setData(chartDataPrice)

    const lineSeries2 = chartInstance.current?.addLineSeries({
      color: 'white',
      priceScaleId: 'left',
    })

    const chartDataPrice2: ChartDataPrice[] = cumulativeReturns_ret.map((data, index) => ({
      time: formatDate(datesFiltered[index]) as Time,
      value: (data - 1) * 100,
    }))

    lineSeries2?.setData(chartDataPrice2)

    // Set visible range after chart is created
    chartInstance.current?.timeScale().setVisibleRange(visibleRange)

    const rightLabel = document.createElement('div')
    rightLabel.style.position = 'absolute'
    rightLabel.style.top = '-40px'
    rightLabel.style.left = '10px'
    rightLabel.style.color = 'white'
    rightLabel.style.zIndex = '1'
    rightLabel.innerText = 'ROC (%)'

    chartContainerRef.current?.appendChild(rightLabel)

    // Tooltip setup
    const toolTipWidth = 96

    // Create and style the tooltip html element
    const toolTip = document.createElement('div')
    Object.assign(toolTip.style, {
      width: `${toolTipWidth}px`,
      height: '400px',
      position: 'absolute',
      display: 'none',
      padding: '8px',
      boxSizing: 'border-box',
      fontSize: '12px',
      textAlign: 'left',
      zIndex: '1000',
      top: '12px',
      left: '12px',
      pointerEvents: 'none',
      fontFamily: '-apple-system, BlinkMacSystemFont, Montserrat, Roboto, Ubuntu, sans-serif',
      color: 'white',
    })

    toolTip.style.background = `rgba(255, 255, 255, 0.10)`
    toolTip.style.color = 'white'
    chartContainerRef.current?.appendChild(toolTip)

    chartInstance.current?.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > (chartContainerRef.current?.clientWidth ?? 0) ||
        param.point.y < 0 ||
        param.point.y > (chartContainerRef.current?.clientHeight ?? 0)
      ) {
        toolTip.style.display = 'none'
      } else {
        toolTip.style.display = 'block'
        const dateStr = param.time as string
        const data = lineSeries ? (param.seriesData.get(lineSeries) as { value?: number; close?: number }) : undefined
        const rocScaled = data?.value !== undefined ? data.value : data?.close
        const data2 = lineSeries2
          ? (param.seriesData.get(lineSeries2) as { value?: number; close?: number })
          : undefined
        const rocCumulative = data2?.value !== undefined ? data2.value : data2?.close

        if (rocCumulative !== undefined && rocScaled !== undefined) {
          if (rocCumulative < rocScaled) {
            toolTip.innerHTML = `<div style="color: white">${coin}</div>
            <div>
              <p style="font-size: 10px; margin: 4px 0px; color: #ef233c; font-weight: bold;">
              Vol Scaled: ${rocScaled?.toFixed(2)}%</p>
              <p style="font-size: 10px; margin: 4px 0px; color: white; font-weight: bold;">
              Raw Price: ${rocCumulative?.toFixed(2)}%
              </p>
            </div>
            <div style="position: absolute; bottom: 0; left: 0; width: 100%; background-color: #161a1d; color: white; text-align: center; padding-top: 4px; padding-bottom: 8px;">
              ${dateStr}
            </div>
            `
          } else {
            toolTip.innerHTML = `<div style="color: white">${coin}</div>
            <div>
              <p style="font-size: 10px; margin: 4px 0px; color: 'white'; font-weight: bold;">
              Raw Price: ${rocCumulative?.toFixed(2)}%</p>
              <p style="font-size: 10px; margin: 4px 0px; color:#ef233c; font-weight: bold;">
              Vol Scaled: ${rocScaled?.toFixed(2)}%
              </p>
            </div>
            <div style="position: absolute; bottom: 0; left: 0; width: 100%; background-color: #161a1d; color: white; text-align: center; padding-top: 4px; padding-bottom: 8px;">
              ${dateStr}
            </div>
            `
          }

          let left = param.point.x as number
          const timeScaleWidth = chartInstance.current?.timeScale().width() ?? 0
          const priceScaleWidth = chartInstance.current?.priceScale('left').width() ?? 0
          const halfTooltipWidth = toolTipWidth / 2
          left += priceScaleWidth - halfTooltipWidth
          left = Math.min(left, priceScaleWidth + timeScaleWidth - toolTipWidth)
          left = Math.max(left, priceScaleWidth)

          toolTip.style.left = left + 'px'
          toolTip.style.top = '0px'
        }
      }
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.remove()
        toolTip.style.display = 'none'
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
