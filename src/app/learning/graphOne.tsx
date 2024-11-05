'use client'

import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, { useContext, useEffect, useRef, useState } from 'react'

import { lineChartConfig, tooltipConfig, toolTipWidth, zeroLine } from '@/components/ChartsContainer/chartConfig'
import { CoinsContext } from '@/contexts/CoinsContext'
import { useOptionsStore } from '@/store/useOptionsStore'
import { useProStore } from '@/store/useProStore'
import { useStrategyStore } from '@/store/useStrategyStore'
import { classicTheme, proTheme } from '@/styles/colors'
import { calculateRolling, pct_change } from '@/utils/chartComputations'
import { formatDate, formatDateAmerican, formatDateAmericanSimple, hexToRGBA } from '@/utils/formatters'

import type { IChartApi, Time } from 'lightweight-charts'
import { ColorType, createChart } from 'lightweight-charts'

interface PriceChartData {
  time: Time
  value: number
}

interface ThemeColorsType {
  darkness: string
  smoke: string
  primary: string
  white: string
  greySmoke: string
}

interface GraphOneProps {
  startDate: number
  endDate: number
  incrementDate: (days: number) => void
  decreaseDate: (days: number) => void
}

const GraphOne = ({ startDate, endDate, incrementDate, decreaseDate }: GraphOneProps) => {
  const { dates, values } = useContext(CoinsContext)
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<IChartApi | undefined>()
  const { rollingWindow, window, setWindow } = useOptionsStore()
  const { coin } = useStrategyStore()
  const { pro } = useProStore()
  const [max, setMax] = useState<number>(100)
  const [min, setMin] = useState<number>(0)

  const [themeColors, setThemeColors] = useState<ThemeColorsType | null>(null)

  const getCoinArray = () => {
    return values ? values[1] : []
  }

  useEffect(() => {
    if (!pro) {
      setThemeColors({
        darkness: classicTheme.darkness,
        smoke: classicTheme.smoke,
        primary: classicTheme.primary,
        white: classicTheme.white,
        greySmoke: classicTheme.greySmoke,
      })
    } else {
      setThemeColors({
        darkness: proTheme.darkness,
        smoke: proTheme.smoke,
        primary: proTheme.primary,
        white: proTheme.white,
        greySmoke: proTheme.greySmoke,
      })
    }
  }, [pro])

  useEffect(() => {
    const seriesData = getCoinArray()

    if (!chartContainerRef.current || !dates) return

    if (chartInstance.current) {
      chartInstance.current.remove()
    }

    if (chartContainerRef.current) {
      chartInstance.current = createChart(chartContainerRef.current, {
        height: 200,
        ...lineChartConfig,
        localization: {
          dateFormat: "dd MMMM 'yy",
          priceFormatter: (price: number) => {
            return price.toFixed(0) + '%' // Append a string (e.g., currency symbol) to each value
          },
        },
        leftPriceScale: {
          ...lineChartConfig.leftPriceScale,
          mode: 0,
        },
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

    const seriesDataFiltered = seriesData.slice(startDate, endDate)
    const datesFiltered = dates.slice(startDate, endDate)

    let rolled = calculateRolling(pct_change(seriesDataFiltered), rollingWindow)

    for (let i = 0; i < rolled.length; i++) {
      rolled[i] *= Math.sqrt(365)
    }

    rolled = rolled.slice(1)

    const lineSeries = chartInstance.current?.addLineSeries({
      color: themeColors?.white as string,
      priceScaleId: 'left',
      autoscaleInfoProvider: () => ({
        priceRange: {
          minValue: Math.min(...rolled) * 100 - 20,
          maxValue: Math.max(...rolled) * 100 + 10,
        },
      }),
      lastValueVisible: false,
    })

    const chartDataPrice1: PriceChartData[] = rolled.map((data: number, index: number) => ({
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

    Object.assign(toolTip.style, {
      height: '200px',
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
        const data1 = lineSeries ? (param.seriesData.get(lineSeries) as { value?: number; close?: number }) : undefined
        const rolling = data1?.value !== undefined ? data1.value : data1?.close

        if (rolling !== undefined) {
          toolTip.innerHTML = `<div style="color: var(--color-white)">BTC</div>
          <div style="position: absolute; bottom: 0; left: 0; width: 100%; background-color: var(--color-smoke); color: var(--color-white); text-align: center; padding-top: 4px; padding-bottom: 8px;">
            <p style="font-size: 10px; margin: 4px 0px; color: var(--color-primary); font-weight: bold;">
              Volatility: ${rolling?.toFixed(0)}%</p>  
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

    chartContainerRef.current?.appendChild(toolTip)

    let minimumPrice = chartDataPrice1[1].value
    let minimumDate = chartDataPrice1[1].time
    let maximumPrice = minimumPrice
    let maximunDate = minimumDate
    for (let i = 1; i < chartDataPrice1.length; i++) {
      const price = chartDataPrice1[i].value
      const date = chartDataPrice1[i].time
      if (price > maximumPrice) {
        maximumPrice = price
        maximunDate = date
      }
      if (price < minimumPrice) {
        minimumPrice = price
        minimumDate = date
      }
    }

    setMax(maximumPrice)
    setMin(minimumPrice)

    const targetVol = {
      price: 20,
      color: themeColors?.primary,
      lineStyle: 1, // LineStyle.Dotted
      axisLabelVisible: true,
    }

    if (lineSeries) {
      lineSeries.createPriceLine({
        ...zeroLine,
        price: 0,
        color: hexToRGBA(themeColors?.white as string, 0.25),
      })
      lineSeries.createPriceLine(targetVol)
      if (maximunDate < minimumDate) {
        lineSeries.setMarkers([
          {
            time: maximunDate,
            position: 'aboveBar',
            color: 'white',
            shape: 'arrowDown',
            text: `[1] Range top: ${maximumPrice.toFixed(0)}% volatility`,
          },
          {
            time: minimumDate,
            position: 'belowBar',
            color: 'white',
            shape: 'arrowUp',
            text: `[1] Range bottom: ${minimumPrice.toFixed(0)}% volatility`,
          },
        ])
      } else {
        lineSeries.setMarkers([
          {
            time: minimumDate,
            position: 'belowBar',
            color: 'white',
            shape: 'arrowUp',
            text: `[1] Range bottom: ${minimumPrice.toFixed(0)}% volatility`,
          },
          {
            time: maximunDate,
            position: 'aboveBar',
            color: 'white',
            shape: 'arrowDown',
            text: `[1] Range top: ${maximumPrice.toFixed(0)}% volatility`,
          },
        ])
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.remove()
        toolTip.style.display = 'none'
        chartInstance.current = undefined
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coin, dates, rollingWindow, window, themeColors, setWindow, endDate, startDate])

  const getDates = () => {
    if (!dates) return
    const start: string = formatDateAmericanSimple(dates[startDate - 3])
    const end = formatDateAmericanSimple(dates[endDate - 3])
    return `${start} - ${end}`
  }

  return (
    <>
      {values && dates ? (
        <div className="flex items-center justify-between">
          <div className="rounded-lg bg-smoke p-[5vh]">
            <div ref={chartContainerRef} style={{ width: '100%', height: '100%', position: 'relative', zIndex: 10 }} />
            <div className="mt-[2vh] block w-full">
              <div className="flex items-center justify-center space-x-2">
                <div className="h-1 w-[2vw] bg-white"></div>
                <span className="text-sm text-white">90-Day Rolling Volatility</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="h-1 w-[2vw] bg-primary"></div>
                <p className="text-sm text-primary">20% Target Volatility</p>
              </div>
            </div>
            <div className="mt-[4vh] flex items-center justify-center space-x-10">
              <button
                className="flex cursor-pointer items-center justify-center rounded-md bg-darkness px-[2vw] py-[.5vh] text-center text-sm hover:scale-105 hover:text-primary"
                onClick={() => decreaseDate(30)}
              >
                <p className="text-lg">
                  <FontAwesomeIcon icon={['fas', 'backward' as IconName]} />
                </p>
                <p className="ml-2 text-xs">30</p>
              </button>
              <button
                className="cursor-pointer rounded-sm bg-darkness px-[2vw] py-[.5vh] text-center text-xl hover:scale-105 hover:text-primary"
                onClick={() => decreaseDate(1)}
              >
                <p>
                  <FontAwesomeIcon icon={['fas', 'caret-left' as IconName]} />
                </p>
              </button>

              <p className="rounded-md text-sm text-greySmoke">{getDates()}</p>
              <button
                className="cursor-pointer rounded-sm bg-darkness px-[2vw] py-[.5vh] text-center text-xl hover:scale-105 hover:text-primary"
                onClick={() => incrementDate(1)}
              >
                <p>
                  <FontAwesomeIcon icon={['fas', 'caret-right' as IconName]} />
                </p>
              </button>
              <button
                className="flex cursor-pointer items-center justify-center rounded-md bg-darkness px-[2vw] py-[.5vh] text-center text-sm hover:scale-105 hover:text-primary"
                onClick={() => incrementDate(30)}
              >
                <p className="mr-2 text-xs">30</p>
                <p className="text-lg">
                  <FontAwesomeIcon icon={['fas', 'forward' as IconName]} />
                </p>
              </button>
            </div>
          </div>
          <div className="mx-auto w-[40%] space-y-[2vh] px-[2vw] text-lg">
            <p className="flex items-center text-justify">
              <b className="mr-[2vw] rounded-lg bg-white px-[1vw] py-[1vh] text-primary">1</b>The volatility of an asset
              like BTC changes significantly. Over a 90 days period it ranged from {min.toFixed(0)}% at its lowest to{' '}
              {max.toFixed(0)}% at its highest
            </p>
            <p className="flex items-center text-justify">
              <b className="mr-[2vw] rounded-lg bg-primary px-[1vw] py-[1vh] text-white">2</b>To control volatility, we
              can define a “Target Volatility 20%”. This means that the standard deviation of the daily returns will be
              20% over time, and not a random number between {min.toFixed(0)}% and {max.toFixed(0)}%
            </p>
          </div>
        </div>
      ) : (
        <p className="text-md text-center text-primary">Loading ... </p>
      )}
    </>
  )
}

export default GraphOne
