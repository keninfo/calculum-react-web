import React, { useContext, useEffect, useRef, useState } from 'react'

import { OptionsContext, ProContext } from '@/components/AppProviders'
import { classicTheme, proTheme } from '@/styles/colors'
import { formatDate, formatDateAmerican, hexToRGBA } from '@/utils/formatters'

import { calculateCumulativeReturns, calculateScaledReturnsLeverage, pct_change } from '../chartComputations'
import { lineChartConfig, tooltipConfig, toolTipWidth, zeroLine } from '../chartConfig'

import type { IChartApi, Time } from 'lightweight-charts'
import { ColorType, createChart } from 'lightweight-charts'

interface PriceChartData {
  time: Time
  value: number
}

interface ChartProps {
  dates: Date[]
  seriesData1: number[]
  seriesData2: number[]
  rawOnly?: boolean
}

interface ThemeColorsType {
  darkness: string
  smoke: string
  carmesi: string
  white: string
  greySmoke: string
}

const ActualVol = ({ dates, seriesData1, seriesData2, rawOnly = true }: ChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<IChartApi | undefined>()
  const initialVisibleRange = useRef<{ from: Time; to: Time } | undefined>(undefined)
  const { coin, window, rollingWindow, volatility, showCandle, studyCase, setWindow, setVolatility } =
    useContext(OptionsContext)
  const { pro } = useContext(ProContext)

  const [themeColors, setThemeColors] = useState<ThemeColorsType | null>(null)

  useEffect(() => {
    if (!pro) {
      setThemeColors({
        darkness: classicTheme.darkness,
        smoke: classicTheme.smoke,
        carmesi: classicTheme.carmesi,
        white: classicTheme.white,
        greySmoke: classicTheme.greySmoke,
      })
    } else {
      setThemeColors({
        darkness: proTheme.darkness,
        smoke: proTheme.smoke,
        carmesi: proTheme.carmesi,
        white: proTheme.white,
        greySmoke: proTheme.greySmoke,
      })
    }
  }, [pro])

  useEffect(() => {
    if (!chartContainerRef.current) return

    if (chartInstance.current) {
      chartInstance.current.remove()
    }

    if (chartContainerRef.current) {
      chartInstance.current = createChart(chartContainerRef.current, {
        height: 200,
        ...lineChartConfig,
        // timeScale: { visible: false },
        layout: {
          background: { type: ColorType.Solid, color: 'transparent' },
          textColor: themeColors?.white,
        },
        crosshair: {
          ...lineChartConfig.crosshair,
          vertLine: { ...lineChartConfig.crosshair.vertLine, color: hexToRGBA(themeColors?.white as string, 0.1) },
        },
      })
    }

    const periods = 365 // only for daily, have to change if hourly
    let selectedWindow = window

    if (studyCase == 1) {
      selectedWindow = 1171
    } else if (studyCase == 2) {
      selectedWindow = 258
    }

    selectedWindow = 75
    setVolatility(0.2)

    const seriesData1Filtered = seriesData1.slice(
      seriesData1.length - (selectedWindow + rollingWindow),
      seriesData1.length - 14,
    )
    const seriesData2Filtered = seriesData2.slice(seriesData2.length - selectedWindow, seriesData2.length - 14)
    const datesFiltered = dates.slice(dates.length - selectedWindow, dates.length - 14)

    const data1PercentageChange = pct_change(seriesData1Filtered)
    const scaledReturns = calculateScaledReturnsLeverage(data1PercentageChange, rollingWindow, periods, volatility)

    const scaledReturnsLimited = scaledReturns.map((value) => (value ? Math.min(value, 1) : 0))

    const cumulativeReturnsScaled = calculateCumulativeReturns(
      data1PercentageChange.map((returnValue, index) => returnValue * scaledReturnsLimited[index]),
    )

    const cumulativeReturnsScaledSliced = cumulativeReturnsScaled.slice(
      rollingWindow - 1,
      cumulativeReturnsScaled.length,
    )

    cumulativeReturnsScaledSliced[0] = 1

    const data2PercentageChange = pct_change(seriesData2Filtered)
    const cumulativeReturns = calculateCumulativeReturns(data2PercentageChange)
    cumulativeReturns.unshift(1)

    const lineSeries1 = chartInstance.current?.addLineSeries({
      color: themeColors?.carmesi,
      priceScaleId: 'left',
    })

    const chartDataPrice1: PriceChartData[] = cumulativeReturnsScaledSliced.map((data, index) => ({
      time: formatDate(datesFiltered[index]) as Time,
      value: data * 100,
    }))

    const lineSeries2 = chartInstance.current?.addLineSeries({
      color: themeColors?.white,
      priceScaleId: 'left',
    })

    const chartDataPrice2: PriceChartData[] = cumulativeReturns.map((data, index) => ({
      time: formatDate(datesFiltered[index]) as Time,
      value: data * 100,
    }))

    if (!rawOnly) {
      lineSeries1?.setData(chartDataPrice1)
    }
    lineSeries2?.setData(chartDataPrice2)

    const visibleRange = {
      from: formatDate(datesFiltered[0]) as Time,
      to: formatDate(datesFiltered[datesFiltered.length - 1]) as Time,
    }

    initialVisibleRange.current = visibleRange
    chartInstance.current?.timeScale().setVisibleRange(visibleRange)

    const toolTip = document.createElement('div')

    Object.assign(toolTip.style, {
      height: '230px',
      ...tooltipConfig,
    })

    toolTip.style.background = hexToRGBA(themeColors?.white as string, 0.1)
    toolTip.style.color = 'var(--color-white)'

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
        const dateStr = formatDateAmerican(param.time)
        const data1 = lineSeries2
          ? (param.seriesData.get(lineSeries2) as { value?: number; close?: number })
          : undefined
        const rolling = data1?.value !== undefined ? data1.value : data1?.close
        const data2 = lineSeries1
          ? (param.seriesData.get(lineSeries1) as { value?: number; close?: number })
          : undefined
        const scaled = data2?.value !== undefined ? data2.value : data2?.close

        if (rolling !== undefined) {
          if (rawOnly) {
            toolTip.innerHTML = `<div style="color: var(--color-white)">BTC</div>
            <div style="position: absolute; bottom: 0; left: 0; width: 100%; background-color: var(--color-darkness); color: var(--color-white); text-align: center; padding-top: 4px; padding-bottom: 8px;">
            <p style="font-size: 10px; margin: 4px 0px; color: var(--color-white); font-weight: bold;">
                RoC Raw: ${rolling?.toFixed(0)}%</p>
              ${dateStr}
            </div>`
          } else {
            toolTip.innerHTML = `<div style="color: var(--color-white)">BTC</div>
            <div style="position: absolute; bottom: 0; left: 0; width: 100%; background-color: var(--color-darkness); color: var(--color-white); text-align: center; padding-top: 4px; padding-bottom: 8px;">
            <p style="font-size: 10px; margin: 4px 0px; color: var(--color-carmesi); font-weight: bold;">
                RoC Scaled: ${scaled?.toFixed(0)}%</p>    
            <p style="font-size: 10px; margin: 4px 0px; color: var(--color-white); font-weight: bold;">
                RoC Raw: ${rolling?.toFixed(0)}%</p>
                
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

    chartContainerRef.current?.appendChild(toolTip)

    if (lineSeries1) {
      lineSeries1.createPriceLine({ ...zeroLine, color: hexToRGBA(themeColors?.white as string, 0.25) })
    }

    if (lineSeries2 && rawOnly) {
      lineSeries2.setMarkers([
        {
          time: '2024-05-06',
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: '2024-05-07',
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: '2024-05-08',
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: '2024-05-09',
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: '2024-05-10',
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: '2024-05-11',
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: '2024-05-12',
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: '2024-05-13',
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: '2024-05-14',
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: '2024-05-15',
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: '2024-05-16',
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: '2024-05-17',
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: '2024-05-18',
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: '2024-05-19',
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: '2024-05-20',
          position: 'aboveBar',
          color: 'red',
          shape: 'arrowDown',
          text: '[1] Rolling Window of 14 Days',
        },
      ])
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.remove()
        toolTip.style.display = 'none'
        chartInstance.current = undefined
      }
    }
  }, [
    coin,
    dates,
    rollingWindow,
    seriesData1,
    showCandle,
    studyCase,
    volatility,
    window,
    themeColors,
    setWindow,
    seriesData2,
    rawOnly,
    setVolatility,
  ])

  return (
    <div className="relative">
      <div className="absolute -top-10 left-[4vw]  w-full">
        <div className="flex items-center space-x-2">
          <div className="w-[2vw] h-1 bg-white"></div>
          <span className="text-sm">
            {coin.substring(0, coin.indexOf(' ')) ? coin.substring(0, coin.indexOf(' ')) : coin} - Raw Price
          </span>
        </div>
        {!rawOnly && (
          <div className="flex items-center space-x-2 w-fit">
            <div className="w-[2vw] h-1 bg-carmesi"></div>
            <p className="text-carmesi text-sm">
              {coin.substring(0, coin.indexOf(' ')) ? coin.substring(0, coin.indexOf(' ')) : coin}
              {pro ? ' - Volatility Scaled' : ' - Low Volatility'}
            </p>
          </div>
        )}
      </div>
      <div ref={chartContainerRef} style={{ width: '100%', height: '100%', position: 'relative', marginTop: '20px' }} />
    </div>
  )
}

export default ActualVol
