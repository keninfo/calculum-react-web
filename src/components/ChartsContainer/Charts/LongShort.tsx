'use client'

import React, { useEffect, useRef, useState } from 'react'

import { lineChartConfig } from '@/components/ChartsContainer/chartConfig'
import Card from '@/components/common/Card'
import { useStrategyStore } from '@/store/useStrategyStore'
import { classicTheme, proTheme } from '@/styles/colors'
import { hexToRGBA } from '@/utils/formatters'

import type { IChartApi, HistogramSeriesOptions, ISeriesApi } from 'lightweight-charts'
import { createChart, ColorType } from 'lightweight-charts'

const API_URL = '/api/fetch-token-data?token='

interface ThemeColorsType {
  dark: string
  eerie: string
  primary: string
  offWhite: string
  grey: string
  robin: string
}

const LongShortChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const [chart, setChart] = useState<IChartApi | null>(null)
  const [series, setSeries] = useState<ISeriesApi<'Histogram'> | null>(null)
  const { coin } = useStrategyStore()

  const [themeColors] = useState<ThemeColorsType>({
    dark: classicTheme.dark,
    eerie: classicTheme.eerie,
    primary: classicTheme.primary,
    offWhite: classicTheme.offWhite,
    grey: classicTheme.grey,
    robin: proTheme.robin,
  })

  useEffect(() => {
    if (!chartContainerRef.current) return

    const newChart = createChart(chartContainerRef.current, {
      autoSize: true,
      height: 200,
      ...lineChartConfig,
      layout: {
        ...lineChartConfig.layout,
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: themeColors.offWhite,
      },
      leftPriceScale: {
        ...lineChartConfig.leftPriceScale,
        mode: 0, // Ensure linear scale
      },
      rightPriceScale: { visible: false },
      crosshair: {
        ...lineChartConfig.crosshair,
        vertLine: { ...lineChartConfig.crosshair.vertLine, color: hexToRGBA(themeColors.offWhite, 0.1) },
      },
      localization: { dateFormat: "dd MMMM 'yy" },
    })

    setChart(newChart)
    return () => newChart.remove()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!chart || !coin) return

    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + `mo${coin}`)
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`)
        const data = await response.json()

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sortedData = data.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())

        // Remove old series if exists
        if (series) {
          chart.removeSeries(series)
        }

        // Create a new histogram series
        const newSeries = chart.addHistogramSeries({
          priceFormat: { type: 'price', precision: 1 },
          color: '#4CAF50',
        } as HistogramSeriesOptions)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const barData = sortedData.map((item: any) => {
          const position = parseFloat(item.position)

          return {
            time: Math.floor(new Date(item.date).getTime() / 1000),
            value: position,
            color: position === 1 ? proTheme.robin : position === 0.5 ? proTheme.burnt : '#E57373', // Green, Yellow, Red
          }
        })

        newSeries.setData(barData)
        chart.timeScale().fitContent() // Ensure full dataset is visible

        setSeries(newSeries)
      } catch (error) {
        console.error('Error fetching chart data:', error)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart, coin]) // Re-fetch when the chart or coin changes

  return (
    <Card className="mt-4 h-fit w-full bg-[#3B3B3B]">
      <div ref={chartContainerRef} style={{ width: '100%', height: '100%', position: 'relative' }} />
    </Card>
  )
}

export default LongShortChart
