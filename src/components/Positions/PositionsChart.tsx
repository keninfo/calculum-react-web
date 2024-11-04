import React, { useContext, useEffect, useRef, useState } from 'react'

import { CoinsContext } from '@/contexts/CoinsContext'
import { OptionsContext } from '@/contexts/OptionsContext'
import { ProContext } from '@/contexts/ProContext'
import { classicTheme, proTheme } from '@/styles/colors'
import { formatDate, formatDateAmerican, hexToRGBA } from '@/utils/formatters'

import { lineChartConfig, tooltipConfig, toolTipWidth, zeroLine } from './chartConfig'

import type { IChartApi, Time } from 'lightweight-charts'
import { ColorType, createChart } from 'lightweight-charts'

interface PriceChartData {
  time: Time
  value: number
}

interface ThemeColorsType {
  darkness: string
  smoke: string
  carmesi: string
  white: string
  greySmoke: string
}

const PositionsChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<IChartApi | undefined>()
  const initialVisibleRange = useRef<{ from: Time; to: Time } | undefined>(undefined)
  const { rollingWindow, volatility } = useContext(OptionsContext)
  const { pro } = useContext(ProContext)
  const { dates } = useContext(CoinsContext)

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
    const values = [1, 1, 1, 1, 1, 1, 1]
    if (!chartContainerRef.current) return

    if (!values || !dates) return

    if (chartInstance.current) {
      chartInstance.current.remove()
    }

    if (chartContainerRef.current) {
      chartInstance.current = createChart(chartContainerRef.current, {
        height: 200,
        ...lineChartConfig,
        // timeScale: { visible: false },
        layout: {
          ...lineChartConfig.layout,
          background: { type: ColorType.Solid, color: 'transparent' },
          textColor: themeColors?.white,
        },
        crosshair: {
          ...lineChartConfig.crosshair,
          vertLine: { ...lineChartConfig.crosshair.vertLine, color: hexToRGBA(themeColors?.white as string, 0.1) },
        },
      })
    }

    const datesFiltered = dates.slice(-7)

    const lineSeries1 = chartInstance.current?.addLineSeries({
      color: themeColors?.carmesi,
      priceScaleId: 'left',
    })

    const chartDataPrice1: PriceChartData[] = values.map((data, index) => {
      const date = datesFiltered[index]
      const formattedDate = formatDate(date)
      return {
        time: formattedDate as Time,
        value: data * 100,
      }
    })

    lineSeries1?.setData(chartDataPrice1)

    const visibleRange = {
      from: formatDate(datesFiltered[0]) as Time,
      to: formatDate(datesFiltered[datesFiltered.length - 1]) as Time,
    }

    initialVisibleRange.current = visibleRange
    chartInstance.current?.timeScale().setVisibleRange(visibleRange)

    const toolTip = document.createElement('div')

    Object.assign(toolTip.style, {
      height: '200',
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
        toolTip.style.display = 'block '
        const dateStr = formatDateAmerican(param.time)
        const data1 = lineSeries1
          ? (param.seriesData.get(lineSeries1) as { value?: number; close?: number })
          : undefined
        const rocScaled = data1?.value !== undefined ? data1.value : data1?.close

        if (rocScaled !== undefined) {
          toolTip.innerHTML = `<div style="color: var(--color-white)">${'BTC Smoothcoin'}</div>
          <div>
            <p style="font-size: 10px; margin: 4px 0px; color: var(--color-carmesi); font-weight: bold;">
            Vol Scaled: ${(rocScaled / 100)?.toFixed(2)}</p>
          </div>
          <div style="position: absolute; bottom: 0; left: 0; width: 100%; background-color: var(--color-darkness); color: var(--color-white); text-align: center; padding-top: 4px; padding-bottom: 8px;">
            ${dateStr}
          </div>`
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

    if (lineSeries1) {
      lineSeries1.createPriceLine({ ...zeroLine, color: hexToRGBA(themeColors?.white as string, 0.25) })
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.remove()
        toolTip.style.display = 'none'
        chartInstance.current = undefined
      }
    }
  }, [dates, rollingWindow, volatility, themeColors])

  return <div ref={chartContainerRef} style={{ width: '100%', height: '100%', position: 'relative' }} />
}

export default PositionsChart
