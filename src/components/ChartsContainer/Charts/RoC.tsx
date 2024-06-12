import React, { useContext, useEffect, useRef } from 'react'

import { OptionsContext } from '@/components/AppProviders'
import { formatDate } from '@/utils/formatters'

import { calculateCumulativeReturns, calculateScaledReturns, pct_change } from '../chartComputations'
import { lineChartConfig, tooltipConfig, toolTipWidth } from '../chartConfig'

import type { IChartApi, Time } from 'lightweight-charts'
import { createChart } from 'lightweight-charts'

interface PriceChartData {
  time: Time
  value: number
}

interface ChartProps {
  dates: Date[]
  seriesData1: number[]
  seriesData2: number[]
  ohcl: number[][]
}

interface OHLCChartData {
  time: Time
  open: number
  high: number
  low: number
  close: number
}

const RoC = ({ dates, seriesData1, seriesData2, ohcl }: ChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<IChartApi | undefined>()
  const initialVisibleRange = useRef<{ from: Time; to: Time } | undefined>(undefined)
  const { coin, window, rollingWindow, volatility, showCandle } = useContext(OptionsContext)

  useEffect(() => {
    if (!chartContainerRef.current) return

    if (chartInstance.current) {
      chartInstance.current.remove()
    }

    if (chartContainerRef.current) {
      chartInstance.current = createChart(chartContainerRef.current, { height: 400, ...lineChartConfig })
    }

    const periods = 365 // only for daily, have to change if hourly

    const seriesData1Filtered = seriesData1.slice(-(window + rollingWindow))
    const seriesData2Filtered = seriesData2.slice(-window)
    const datesFiltered = dates.slice(-(window + rollingWindow))
    const ohclFiltered = ohcl.slice(-window)

    const data1PercentageChange = pct_change(seriesData1Filtered)
    const scaledReturns = calculateScaledReturns(data1PercentageChange, rollingWindow, periods, volatility)
    const cumulativeReturnsScaled = calculateCumulativeReturns(scaledReturns)
    const cumulativeReturnsScaledSliced = cumulativeReturnsScaled.slice(
      rollingWindow - 1,
      cumulativeReturnsScaled.length,
    )

    const data2PercentageChange = pct_change(seriesData2Filtered)
    const cumulativeReturns = calculateCumulativeReturns(data2PercentageChange)
    cumulativeReturns.unshift(1)

    const lineSeries1 = chartInstance.current?.addLineSeries({
      color: '#ef233c',
      priceScaleId: 'left',
    })

    const chartDataPrice1: PriceChartData[] = cumulativeReturnsScaledSliced.map((data, index) => ({
      time: formatDate(datesFiltered[index]) as Time,
      value: (data - 1) * 100,
    }))

    if (!showCandle) {
      lineSeries1?.setData(chartDataPrice1)
    }

    const lineSeries2 = chartInstance.current?.addLineSeries({
      color: 'white',
      priceScaleId: 'left',
    })

    const chartDataPrice2: PriceChartData[] = cumulativeReturns.map((data, index) => ({
      time: formatDate(datesFiltered[index]) as Time,
      value: (data - 1) * 100,
    }))

    if (!showCandle) {
      lineSeries2?.setData(chartDataPrice2)
    }

    const candlestickSeries = chartInstance.current?.addCandlestickSeries({
      priceScaleId: 'left',
    })

    const candlestickData: OHLCChartData[] = ohclFiltered.map((data, index) => ({
      time: formatDate(datesFiltered[index]) as Time,
      open: data[0],
      high: data[1],
      low: data[2],
      close: data[3],
    }))

    if (showCandle) {
      candlestickSeries?.setData(candlestickData)
    }

    const visibleRange = {
      from: formatDate(datesFiltered[0]) as Time,
      to: formatDate(datesFiltered[datesFiltered.length - 1]) as Time,
    }

    initialVisibleRange.current = visibleRange
    chartInstance.current?.timeScale().setVisibleRange(visibleRange)

    const toolTip = document.createElement('div')

    Object.assign(toolTip.style, { height: '400px', ...tooltipConfig })

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
        const data1 = lineSeries1
          ? (param.seriesData.get(lineSeries1) as { value?: number; close?: number })
          : undefined
        const rocScaled = data1?.value !== undefined ? data1.value : data1?.close
        const data2 = lineSeries2
          ? (param.seriesData.get(lineSeries2) as { value?: number; close?: number })
          : undefined
        const rocCumulative = data2?.value !== undefined ? data2.value : data2?.close

        if (!showCandle && rocCumulative !== undefined && rocScaled !== undefined) {
          if (rocScaled > rocCumulative) {
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
          } else {
            toolTip.innerHTML = `<div style="color: white">${coin}</div>
          <div>
            <p style="font-size: 10px; margin: 4px 0px; color: white; font-weight: bold;">
            Raw Price: ${rocCumulative?.toFixed(2)}%</p>
            <p style="font-size: 10px; margin: 4px 0px; color: #ef233c; font-weight: bold;">
            Vol Scaled: ${rocScaled?.toFixed(2)}%</p>
          </div>
          <div style="position: absolute; bottom: 0; left: 0; width: 100%; background-color: #161a1d; color: white; text-align: center; padding-top: 4px; padding-bottom: 8px;">
            ${dateStr}
          </div>`
          }
        } else if (showCandle) {
          const candlestick = candlestickSeries
            ? (param.seriesData.get(candlestickSeries) as {
                open?: number
                high?: number
                low?: number
                close?: number
              })
            : undefined
          if (candlestick) {
            const { open, high, low, close } = candlestick
            toolTip.innerHTML = `<div style="color: white">${coin}</div>
            <div>
              <p style="font-size: 10px; margin: 4px 0px; color: lightblue; font-weight: bold;">
              O: ${open?.toFixed(4)}</p>
              <p style="font-size: 10px; margin: 4px 0px; color: lightgreen; font-weight: bold;">
              H: ${high?.toFixed(4)}</p>
              <p style="font-size: 10px; margin: 4px 0px; color: salmon; font-weight: bold;">
              L: ${low?.toFixed(4)}</p>
              <p style="font-size: 10px; margin: 4px 0px; color: gold; font-weight: bold;">
              C: ${close?.toFixed(4)}</p>
            </div>
            <div style="position: absolute; bottom: 0; left: 0; width: 100%; background-color: #161a1d; color: white; text-align: center; padding-top: 4px; padding-bottom: 8px;">
              ${dateStr}
            </div>`
          }
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
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.remove()
        toolTip.style.display = 'none'
        chartInstance.current = undefined
      }
    }
  }, [coin, dates, ohcl, rollingWindow, seriesData1, seriesData2, showCandle, volatility, window])

  return (
    <div className="relative">
      <div ref={chartContainerRef} style={{ width: '100%', height: '100%', position: 'relative', marginTop: '20px' }} />
    </div>
  )
}

export default RoC
