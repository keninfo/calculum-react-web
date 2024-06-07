'use client'

import type { SetStateAction } from 'react'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { CoinContext } from '@/components/AppProviders'
import ChartOptions from '@/components/ChartOptions/Index'
import Card from '@/components/common/Card'

import {
  pct_change,
  calculateScaledReturns,
  calculateCumulativeReturns,
  calculateRolling,
  safeRound,
  calculateMean,
  calculateStd,
  cummax,
} from './chartComputations'

import type { IChartApi, Time } from 'lightweight-charts'
import { createChart, ColorType } from 'lightweight-charts'

interface ChartDataPrice {
  time: Time
  value: number
}

interface PerformanceData {
  sharpe: number
  cagr: number
  dd_max: string
}

interface NewPerformance {
  raw: PerformanceData
  scaled: PerformanceData
}

const formatDate = (date: Date): string => {
  const newDate = new Date(date)
  const year = newDate.getUTCFullYear()
  const month = String(newDate.getUTCMonth() + 1).padStart(2, '0')
  const day = String(newDate.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const Chart = ({
  coins,
  prices,
  dates,
  onPerformanceUpdate,
}: {
  coins: string[]
  prices: number[][]
  dates: Date[]
  onPerformanceUpdate: (data: NewPerformance) => void
}) => {
  const chartContainerRef1 = useRef<HTMLDivElement>(null)
  const chartContainerRef2 = useRef<HTMLDivElement>(null)
  const chartInstance1 = useRef<IChartApi | undefined>()
  const chartInstance2 = useRef<IChartApi | undefined>()
  const previousPerformanceRef = useRef<NewPerformance>()

  const [periods_per_year, setPeriod] = useState<number>(0)
  const [rolling_window, setRollling] = useState<number>(0)
  const [target_vol, setVol] = useState<number>(0.2)
  const [window, setDays] = useState<number>(2)
  const [last, setLast] = useState<number>(14)
  const [showSecondChart, setShowSecondChart] = useState<boolean>(true)

  const { coin } = useContext(CoinContext)

  useEffect(() => {
    if (coin == 'ETH') {
      setVol(0.1)
    } else if (coin == 'BTC') {
      setVol(0.6)
    } else {
      setVol(0.6)
    }
  }, [coin])

  useEffect(() => {
    setPeriod(365)
    if (coin == 'ETH') {
      setRollling(14)
    } else if (coin == 'BTC') {
      setRollling(14)
    } else {
      setRollling(14)
    }
  }, [coin, window])

  useEffect(() => {
    if (!chartContainerRef1.current) return
    if (showSecondChart && !chartContainerRef2.current) return

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

    let years = 1
    if (last == 30) {
      years = 0.08
    } else if (last == 60) {
      years = 0.16
    } else if (last == 90) {
      years = 0.25
    }

    const cum_max_raw = cummax(cumulativeReturns_ret)
    const cum_max_scaled = cummax(cumulativeReturnsScaled)

    const divided_raw = cumulativeReturns_ret.map((value, index) => {
      return value / cum_max_raw[index]
    })
    const divided_scaled = cumulativeReturnsScaled.map((value, index) => {
      return value / cum_max_scaled[index]
    })

    const subtracted_raw = divided_raw.map((value) => value - 1)
    const subtracted_scaled = divided_scaled.map((value) => value - 1)

    const absValues_raw = subtracted_raw.map((value) => Math.abs(value))
    const absValues_scaled = subtracted_scaled.map((value) => Math.abs(value))

    // const result_raw = absValues_raw.filter(value => !isNaN(value));
    // const result_scaled = absValues_scaled.filter(value => !isNaN(value));

    const sorted_raw = absValues_raw.sort((a, b) => b - a)
    const sorted_scaled = absValues_scaled.sort((a, b) => b - a)

    const newPerformance = {
      raw: {
        sharpe: safeRound(
          (calculateMean(percentageChange) / (calculateStd(percentageChange) || 1)) * Math.sqrt(periods_per_year),
          2,
        ),
        cagr: safeRound((cumulativeReturns_ret[cumulativeReturns_ret.length - 1] ** (1 / years) - 1) * 100, 2),
        dd_max: `-${(sorted_raw[0] * 100).toFixed(1)}`,
      },
      scaled: {
        sharpe: safeRound(
          (calculateMean(scaledReturns) / (calculateStd(scaledReturns) || 1)) * Math.sqrt(periods_per_year),
          2,
        ),
        cagr: safeRound((cumulativeReturnsScaled[cumulativeReturnsScaled.length - 1] ** (1 / years) - 1) * 100, 2),
        dd_max: `-${(sorted_scaled[0] * 100).toFixed(1)}`,
      },
    }

    if (JSON.stringify(previousPerformanceRef.current) !== JSON.stringify(newPerformance)) {
      previousPerformanceRef.current = newPerformance
      onPerformanceUpdate(newPerformance)
    }

    if (chartInstance1.current) {
      chartInstance1.current.remove()
    }

    if (chartContainerRef1.current) {
      chartInstance1.current = createChart(chartContainerRef1.current, {
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

    const lineSeries1 = chartInstance1.current?.addLineSeries({
      color: '#ef233c',
      priceScaleId: 'left',
    })

    const chartDataPrice1: ChartDataPrice[] = cumulativeReturnsScaled.map((data, index) => ({
      time: formatDate(datesFiltered[index]) as Time,
      value: (data - 1) * 100,
    }))

    lineSeries1?.setData(chartDataPrice1)

    const lineSeries2 = chartInstance1.current?.addLineSeries({
      color: 'white',
      priceScaleId: 'left',
    })

    const chartDataPrice2: ChartDataPrice[] = cumulativeReturns_ret.map((data, index) => ({
      time: formatDate(datesFiltered[index]) as Time,
      value: (data - 1) * 100,
    }))

    lineSeries2?.setData(chartDataPrice2)

    // Set visible range after chart is created
    chartInstance1.current?.timeScale().setVisibleRange(visibleRange)

    const rightLabel1 = document.createElement('div')
    rightLabel1.style.position = 'absolute'
    rightLabel1.style.top = '-40px'
    rightLabel1.style.left = '10px'
    rightLabel1.style.color = 'white'
    rightLabel1.style.zIndex = '1'
    rightLabel1.innerText = 'RoC (%)'

    chartContainerRef1.current?.appendChild(rightLabel1)

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
    chartContainerRef1.current?.appendChild(toolTip)

    chartInstance1.current?.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > (chartContainerRef1.current?.clientWidth ?? 0) ||
        param.point.y < 0 ||
        param.point.y > (chartContainerRef1.current?.clientHeight ?? 0)
      ) {
        toolTip.style.display = 'none'
      } else {
        toolTip.style.display = 'block'
        const dateStr = param.time as string
        const data1 = lineSeries1
          ? (param.seriesData.get(lineSeries1) as { value?: number; close?: number })
          : undefined
        const rocScaled = data1?.value !== undefined ? data1.value : data1?.close
        const data2 = lineSeries2
          ? (param.seriesData.get(lineSeries2) as { value?: number; close?: number })
          : undefined
        const rocCumulative = data2?.value !== undefined ? data2.value : data2?.close

        if (rocCumulative !== undefined && rocScaled !== undefined) {
          toolTip.innerHTML = `<div style="color: white">${coin}</div>
          <div>
            <p style="font-size: 10px; margin: 4px 0px; color: #ef233c; font-weight: bold;">
            Vol Scaled: ${rocScaled?.toFixed(2)}%</p>
            <p style="font-size: 10px; margin: 4px 0px; color: white; font-weight: bold;">
            Raw Price: ${rocCumulative?.toFixed(2)}%</p>
          </div>
          <div style="position: absolute; bottom: 0; left: 0; width: 100%; background-color: #161a1d; color: white; text-align: center; padding-top: 4px; padding-bottom: 8px;">
            ${dateStr}
          </div>`

          let left = param.point.x as number
          const timeScaleWidth = chartInstance1.current?.timeScale().width() ?? 0
          const priceScaleWidth = chartInstance1.current?.priceScale('left').width() ?? 0
          const halfTooltipWidth = toolTipWidth / 2
          left += priceScaleWidth - halfTooltipWidth
          left = Math.min(left, priceScaleWidth + timeScaleWidth - toolTipWidth)
          left = Math.max(left, priceScaleWidth)

          toolTip.style.left = left + 'px'
          toolTip.style.top = '0px'
        }
      }
    })

    // Setup for the second chart
    if (chartInstance2.current) {
      chartInstance2.current.remove()
    }

    if (showSecondChart && chartContainerRef2.current) {
      chartInstance2.current = createChart(chartContainerRef2.current, {
        height: 200,
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

      const lineSeries3 = chartInstance2.current?.addLineSeries({
        color: 'limegreen',
        priceScaleId: 'left',
      })

      const chartDataPrice3: ChartDataPrice[] = rolled.map((data, index) => ({
        time: formatDate(datesFiltered[index]) as Time,
        value: data - 1,
      }))

      lineSeries3?.setData(chartDataPrice3)

      const toolTip2 = document.createElement('div')
      Object.assign(toolTip2.style, {
        width: `${toolTipWidth}px`,
        height: '200px',
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

      toolTip2.style.background = `rgba(255, 255, 255, 0.10)`
      toolTip2.style.color = 'white'
      chartContainerRef2.current?.appendChild(toolTip2)

      chartInstance2.current?.subscribeCrosshairMove((param) => {
        if (
          param.point === undefined ||
          !param.time ||
          param.point.x < 0 ||
          param.point.x > (chartContainerRef2.current?.clientWidth ?? 0) ||
          param.point.y < 0 ||
          param.point.y > (chartContainerRef2.current?.clientHeight ?? 0)
        ) {
          toolTip2.style.display = 'none'
        } else {
          toolTip2.style.display = 'block'
          const dateStr = param.time as string
          const data1 = lineSeries3
            ? (param.seriesData.get(lineSeries3) as { value?: number; close?: number })
            : undefined
          const rollingVol = data1?.value !== undefined ? data1.value : data1?.close

          if (rollingVol !== undefined) {
            toolTip2.innerHTML = `<div style="color: white">${coin}</div>
            <div>
              <p style="font-size: 10px; margin: 4px 0px; color: limegreen; font-weight: bold;">
              Vol: ${rollingVol?.toFixed(2)}</p>
            </div>
            <div style="position: absolute; bottom: 0; left: 0; width: 100%; background-color: #161a1d; color: white; text-align: center; padding-top: 4px; padding-bottom: 8px;">
              ${dateStr}
            </div>`

            let left = param.point.x as number
            const timeScaleWidth = chartInstance2.current?.timeScale().width() ?? 0
            const priceScaleWidth = chartInstance2.current?.priceScale('left').width() ?? 0
            const halfTooltipWidth = toolTipWidth / 2
            left += priceScaleWidth - halfTooltipWidth
            left = Math.min(left, priceScaleWidth + timeScaleWidth - toolTipWidth)
            left = Math.max(left, priceScaleWidth)

            toolTip2.style.left = left + 'px'
            toolTip2.style.top = '0px'
          }
        }
      })
    }

    return () => {
      if (chartInstance1.current) {
        chartInstance1.current.remove()
        toolTip.style.display = 'none'
        chartInstance1.current = undefined
      }
      if (chartInstance2.current) {
        chartInstance2.current.remove()
        toolTip.style.display = 'none'
        chartInstance2.current = undefined
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coin, coins, prices, dates, rolling_window, periods_per_year, target_vol, last, showSecondChart])

  const submit = (data: {
    volatility: SetStateAction<number>
    days: SetStateAction<number>
    dates: SetStateAction<number>
  }) => {
    setDays(data.days)
    setLast(data.dates)
  }

  const toggleSecondChart = () => {
    setShowSecondChart(!showSecondChart)
  }

  return (
    <>
      <Card className="w-full p-[2vh] pr-0">
        <ChartOptions onSubmit={submit} coins={coins} volatility={target_vol} days={rolling_window} />
        <div
          ref={chartContainerRef1}
          style={{ width: '100%', height: '50%', position: 'relative', marginTop: '50px' }}
        />
      </Card>
      <Card className={`w-full mt-[2vh] ${showSecondChart ? 'p-[2vh] pr-0' : 'py-[1vh] px-[3vw]'}`}>
        <div className={`w-full flex justify-between ${showSecondChart ? 'pr-[3vw]' : ''}`}>
          <p className="text-xl">Rolling Volatility</p>
          <button className="border py-[.5vh] px-[1vw] text-xs hover:scale-105" onClick={toggleSecondChart}>
            {showSecondChart ? 'Hide' : 'Show'}
          </button>
        </div>

        {showSecondChart && (
          <div
            ref={chartContainerRef2}
            style={{ width: '100%', height: '20%', position: 'relative', marginTop: '50px' }}
          />
        )}
      </Card>
    </>
  )
}

export default Chart
