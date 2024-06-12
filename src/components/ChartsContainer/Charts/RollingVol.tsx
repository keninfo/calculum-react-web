import React, { useContext, useEffect, useRef } from 'react'

import { OptionsContext } from '@/components/AppProviders'
import { formatDate } from '@/utils/formatters'

import { calculateRolling, pct_change } from '../chartComputations'
import { lineChartConfig, toolTipWidth, tooltipConfig } from '../chartConfig'

import type { IChartApi, Time } from 'lightweight-charts'
import { createChart } from 'lightweight-charts'

interface PriceChartData {
  time: Time
  value: number
}

interface ChartProps {
  dates: Date[]
  seriesData: number[]
}

const RoC = ({ dates, seriesData }: ChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<IChartApi | undefined>()
  const { coin, rollingWindow, window } = useContext(OptionsContext)

  useEffect(() => {
    if (!chartContainerRef.current) return

    if (chartInstance.current) {
      chartInstance.current.remove()
    }

    if (chartContainerRef.current) {
      chartInstance.current = createChart(chartContainerRef.current, { height: 200, ...lineChartConfig })
    }

    const seriesDataFiltered = seriesData.slice(-window)
    const datesFiltered = dates.slice(-window)

    const rolled = calculateRolling(pct_change(seriesDataFiltered), rollingWindow)

    for (let i = 0; i < rolled.length; i++) {
      rolled[i] *= Math.sqrt(365)
    }

    const lineSeries = chartInstance.current?.addLineSeries({
      color: 'limegreen',
      priceScaleId: 'left',
    })

    const chartDataPrice1: PriceChartData[] = rolled.map((data, index) => ({
      time: formatDate(datesFiltered[index]) as Time,
      value: data,
    }))

    lineSeries?.setData(chartDataPrice1)

    const visibleRange = {
      from: formatDate(datesFiltered[0]) as Time,
      to: formatDate(datesFiltered[datesFiltered.length - 1]) as Time,
    }

    chartInstance.current?.timeScale().setVisibleRange(visibleRange)

    const toolTip = document.createElement('div')
    Object.assign(toolTip.style, { height: '200px', ...tooltipConfig })
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
        const data1 = lineSeries ? (param.seriesData.get(lineSeries) as { value?: number; close?: number }) : undefined
        const rollingVol = data1?.value !== undefined ? data1.value : data1?.close

        if (rollingVol !== undefined) {
          toolTip.innerHTML = `<div style="color: white">${coin}</div>
          <div>
            <p style="font-size: 10px; margin: 4px 0px; color: limegreen; font-weight: bold;">
            Vol: ${rollingVol?.toFixed(2)}%</p>
          </div>
          <div style="position: absolute; bottom: 0; left: 0; width: 100%; background-color: #161a1d; color: white; text-align: center; padding-top: 4px; padding-bottom: 8px;">
            ${dateStr}
          </div>`

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
  }, [coin, dates, rollingWindow, seriesData, window])

  return <div ref={chartContainerRef} style={{ width: '100%', height: '20%', position: 'relative' }} />
}

export default RoC
