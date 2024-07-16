import React, { useContext, useEffect, useRef, useState } from 'react'

import { OptionsContext, ProContext } from '@/components/AppProviders'
import { classicTheme, proTheme } from '@/styles/colors'
import { formatDate, hexToRGBA } from '@/utils/formatters'

import { calculateRolling, pct_change } from '../chartComputations'
import { lineChartConfig, tooltipConfig, zeroLine } from '../chartConfig'

import type { IChartApi, Time } from 'lightweight-charts'
import { ColorType, createChart } from 'lightweight-charts'

interface PriceChartData {
  time: Time
  value: number
}

interface ChartProps {
  dates: Date[]
  seriesData: number[]
}

interface ThemeColorsType {
  darkness: string
  smoke: string
  carmesi: string
  white: string
  greySmoke: string
}

const VolScaling = ({ dates, seriesData }: ChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<IChartApi | undefined>()
  const { coin, rollingWindow, window, setWindow } = useContext(OptionsContext)
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
        height: 400,
        ...lineChartConfig,
        localization: {
          dateFormat: "dd MMMM 'yy",
          priceFormatter: (price: number) => {
            return price.toFixed(0) + '%' // Append a string (e.g., currency symbol) to each value
          },
        },
        leftPriceScale: {
          visible: true,
          mode: 0,
        },
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

    setWindow(61)

    const seriesDataFiltered = seriesData.slice(
      seriesData.length - (window + rollingWindow + 1),
      seriesData.length - 14,
    )
    const datesFiltered = dates.slice(dates.length - (window + rollingWindow + 1))

    const rolled = calculateRolling(pct_change(seriesDataFiltered), rollingWindow)

    for (let i = 0; i < rolled.length; i++) {
      rolled[i] *= Math.sqrt(365)
    }

    const lineSeries = chartInstance.current?.addLineSeries({
      color: 'SteelBlue',
      priceScaleId: 'left',
      autoscaleInfoProvider: () => ({
        priceRange: {
          minValue: 0,
          maxValue: 80,
        },
      }),
      lastValueVisible: false,
    })

    const chartDataPrice1: PriceChartData[] = rolled.map((data, index) => ({
      time: formatDate(datesFiltered[index]) as Time,
      value: data * 100,
    }))

    lineSeries?.setData(chartDataPrice1)

    const visibleRange = {
      from: formatDate(datesFiltered[0]) as Time,
      to: formatDate(datesFiltered[datesFiltered.length - 1]) as Time,
    }

    chartInstance.current?.timeScale().setVisibleRange(visibleRange)

    const toolTip = document.createElement('div')
    Object.assign(toolTip.style, { height: '200px', ...tooltipConfig })

    toolTip.style.background = hexToRGBA(themeColors?.white as string, 0.1)
    toolTip.style.color = 'var(--color-white)'

    chartContainerRef.current?.appendChild(toolTip)

    let minimumPrice = chartDataPrice1[1].value
    let maximumPrice = minimumPrice
    for (let i = 1; i < chartDataPrice1.length; i++) {
      const price = chartDataPrice1[i].value
      if (price > maximumPrice) {
        maximumPrice = price
      }
      if (price < minimumPrice) {
        minimumPrice = price
      }
    }

    const targetVol = {
      price: 20,
      color: themeColors?.carmesi,
      lineStyle: 0, // LineStyle.Dotted
      axisLabelVisible: true,
      title: '[2] Target Volatility 20%',
    }

    const max = {
      price: maximumPrice,
      color: themeColors?.white,
      axisLabelTextColor: themeColors?.carmesi,
      lineStyle: 0, // LineStyle.Dotted
      axisLabelVisible: true,
      title: '[1] Range top: 80% volatility over a 2-month period',
    }

    const min = {
      price: minimumPrice,
      color: themeColors?.white,
      axisLabelTextColor: themeColors?.carmesi,
      lineStyle: 0, // LineStyle.Dotted
      axisLabelVisible: true,
      title: '[1] Range bottom: 40% volatility over a 2-month period',
    }

    if (lineSeries) {
      lineSeries.createPriceLine({
        ...zeroLine,
        price: 0,
        color: hexToRGBA(themeColors?.white as string, 0.25),
      })
      lineSeries.createPriceLine(targetVol)
      lineSeries.createPriceLine(max)
      lineSeries.createPriceLine(min)
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.remove()
        toolTip.style.display = 'none'
        chartInstance.current = undefined
      }
    }
  }, [coin, dates, rollingWindow, seriesData, window, themeColors, setWindow])

  return <div ref={chartContainerRef} style={{ width: '100%', height: '100%', position: 'relative' }} />
}

export default VolScaling
