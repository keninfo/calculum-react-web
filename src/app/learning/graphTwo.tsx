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
import {
  calculateCumulativeReturns,
  calculateRolling,
  calculateScaledReturnsLeverage,
  pct_change,
  calculateStd,
} from '@/utils/chartComputations'
import { formatDate, formatDateAmerican, formatDateAmericanSimple, hexToRGBA } from '@/utils/formatters'

import type { IChartApi, Time } from 'lightweight-charts'
import { ColorType, createChart } from 'lightweight-charts'

interface PriceChartData {
  time: Time
  value: number
}

interface ThemeColorsType {
  dark: string
  eerie: string
  primary: string
  offWhite: string
  grey: string
}

interface GraphTwoProps {
  startDate: number
  endDate: number
  incrementDate: (days: number) => void
  decreaseDate: (days: number) => void
}

const GraphTwo = ({ startDate, endDate, incrementDate, decreaseDate }: GraphTwoProps) => {
  const { dates, values } = useContext(CoinsContext)
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<IChartApi | undefined>()
  const chartContainerRef2 = useRef<HTMLDivElement>(null)
  const chartInstance2 = useRef<IChartApi | undefined>()
  const initialVisibleRange = useRef<{ from: Time; to: Time } | undefined>(undefined)
  const { window, rollingWindow, volatility, studyCase, setWindow, setVolatility } = useOptionsStore()
  const { coin } = useStrategyStore()
  const { pro } = useProStore()

  const [themeColors, setThemeColors] = useState<ThemeColorsType | null>(null)

  const getCoinArray = () => {
    return values ? values[1] : []
  }
  const [results, setResults] = useState<number[] | null>(null)

  useEffect(() => {
    if (!pro) {
      setThemeColors({
        dark: classicTheme.dark,
        eerie: classicTheme.eerie,
        primary: classicTheme.primary,
        offWhite: classicTheme.offWhite,
        grey: classicTheme.grey,
      })
    } else {
      setThemeColors({
        dark: proTheme.dark,
        eerie: proTheme.eerie,
        primary: proTheme.primary,
        offWhite: proTheme.offWhite,
        grey: proTheme.grey,
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
        // timeScale: { visible: false },
        localization: {
          dateFormat: "dd MMMM 'yy",
          priceFormatter: (price: number) => {
            return price.toFixed(0) + '%' // Append a string (e.g., currency symbol) to each value
          },
        },
        layout: {
          ...lineChartConfig.layout,
          background: { type: ColorType.Solid, color: 'transparent' },
          textColor: themeColors?.offWhite,
        },
        leftPriceScale: {
          ...lineChartConfig.leftPriceScale,
          mode: 0,
        },
        crosshair: {
          ...lineChartConfig.crosshair,
          vertLine: { ...lineChartConfig.crosshair.vertLine, color: hexToRGBA(themeColors?.offWhite as string, 0.1) },
        },
      })
    }

    if (!chartContainerRef2.current) return

    if (chartInstance2.current) {
      chartInstance2.current.remove()
    }

    if (chartContainerRef2.current) {
      chartInstance2.current = createChart(chartContainerRef2.current, {
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
          textColor: themeColors?.offWhite,
        },
        crosshair: {
          ...lineChartConfig.crosshair,
          vertLine: { ...lineChartConfig.crosshair.vertLine, color: hexToRGBA(themeColors?.offWhite as string, 0.1) },
        },
      })
    }

    const periods = 365 // only for daily, have to change if hourly

    setVolatility(0.2)

    const seriesData1Filtered = seriesData.slice(startDate, endDate - 1)
    const seriesData2Filtered = seriesData.slice(startDate, endDate - 1)
    const datesFiltered = dates?.slice(startDate, endDate - 1)

    const rolled = calculateRolling(pct_change(seriesData2Filtered), rollingWindow)

    for (let i = 0; i < rolled.length; i++) {
      rolled[i] *= Math.sqrt(365)
    }

    const dailyReturn = pct_change(seriesData2Filtered)

    const data1PercentageChange = pct_change(seriesData1Filtered)
    const scaledReturns = calculateScaledReturnsLeverage(data1PercentageChange, rollingWindow, periods, volatility)

    const scaledReturnsLimited = scaledReturns.map((value) => (value ? Math.min(value, 1) : 0))

    const cumulativeReturnsScaled = calculateCumulativeReturns(
      data1PercentageChange.map((returnValue, index) => returnValue * scaledReturnsLimited[index]),
    )

    const cumulativeReturnsScaledSliced = cumulativeReturnsScaled

    cumulativeReturnsScaledSliced[0] = 1

    const data2PercentageChange = pct_change(seriesData2Filtered)
    const cumulativeReturns = calculateCumulativeReturns(data2PercentageChange)
    cumulativeReturns.unshift(1)

    setResults(dailyReturn)

    const lineSeries1 = chartInstance2.current?.addLineSeries({
      color: themeColors?.primary as string,
      priceScaleId: 'left',

      lastValueVisible: false,
    })

    const chartDataPrice1: PriceChartData[] = rolled.map((data, index) => ({
      time: formatDate(datesFiltered[index]) as Time,
      value: data * 100,
    }))

    const lineSeries2 = chartInstance.current?.addLineSeries({
      color: themeColors?.offWhite,
      priceScaleId: 'left',
    })

    const chartDataPrice2: PriceChartData[] = dailyReturn.map((data, index) => ({
      time: formatDate(datesFiltered[index]) as Time,
      value: data * 100,
    }))

    lineSeries1?.setData(chartDataPrice1)
    lineSeries2?.setData(chartDataPrice2)

    const visibleRange = {
      from: formatDate(datesFiltered[0]) as Time,
      to: formatDate(datesFiltered[datesFiltered.length - 1]) as Time,
    }

    initialVisibleRange.current = visibleRange
    chartInstance.current?.timeScale().setVisibleRange(visibleRange)
    chartInstance2.current?.timeScale().setVisibleRange(visibleRange)

    const toolTip = document.createElement('div')

    Object.assign(toolTip.style, {
      height: '200px',
      ...tooltipConfig,
    })

    toolTip.style.background = hexToRGBA(themeColors?.offWhite as string, 0.1)
    toolTip.style.color = 'var(--color-offWhite)'

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
        if (rolling !== undefined) {
          toolTip.innerHTML = `<div style="color: var(--color-offWhite)">BTC</div>
            <div style="position: absolute; bottom: 0; left: 0; width: 100%; background-color: var(--color-eerie); color: var(--color-offWhite); text-align: center; padding-top: 4px; padding-bottom: 8px;">
            <p style="font-size: 10px; margin: 4px 0px; color: var(--color-offWhite); font-weight: bold;">
                Daily Return: ${rolling?.toFixed(0)}%</p>
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

    const toolTip2 = document.createElement('div')

    Object.assign(toolTip2.style, {
      height: '200px',
      ...tooltipConfig,
    })

    toolTip2.style.background = hexToRGBA(themeColors?.offWhite as string, 0.1)
    toolTip2.style.color = 'var(--color-offWhite)'

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
        const dateStr = formatDateAmerican(param.time)
        const data1 = lineSeries1
          ? (param.seriesData.get(lineSeries1) as { value?: number; close?: number })
          : undefined
        const rolling = data1?.value !== undefined ? data1.value : data1?.close

        if (rolling !== undefined) {
          toolTip2.innerHTML = `<div style="color: var(--color-offWhite)">BTC</div>
          <div style="position: absolute; bottom: 0; left: 0; width: 100%; background-color: var(--color-eerie); color: var(--color-offWhite); text-align: center; padding-top: 4px; padding-bottom: 8px;">
            <p style="font-size: 10px; margin: 4px 0px; color: var(--color-primary); font-weight: bold;">
              Volatility: ${rolling?.toFixed(0)}%</p>  
            ${dateStr}
          </div>`
        }

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
    })

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

    if (lineSeries1) {
      lineSeries1.createPriceLine({
        ...zeroLine,
        price: 0,
        color: hexToRGBA(themeColors?.offWhite as string, 0.25),
      })
      lineSeries1.setMarkers([
        {
          time: formatDate(dates[endDate - 1 - 3]),
          position: 'aboveBar',
          color: themeColors?.primary as string,
          shape: 'arrowDown',
          text: '[2]',
        },
      ])
    }

    if (lineSeries2) {
      lineSeries2.setMarkers([
        {
          time: formatDate(dates[endDate - 14 - 3]),
          position: 'inBar',
          color: themeColors?.primary as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 13 - 3]),
          position: 'inBar',
          color: themeColors?.primary as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 12 - 3]),
          position: 'inBar',
          color: themeColors?.primary as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 11 - 3]),
          position: 'inBar',
          color: themeColors?.primary as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 10 - 3]),
          position: 'inBar',
          color: themeColors?.primary as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 9 - 3]),
          position: 'inBar',
          color: themeColors?.primary as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 8 - 3]),
          position: 'inBar',
          color: themeColors?.primary as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 7 - 3]),
          position: 'inBar',
          color: themeColors?.primary as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 6 - 3]),
          position: 'inBar',
          color: themeColors?.primary as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 5 - 3]),
          position: 'inBar',
          color: themeColors?.primary as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 4 - 3]),
          position: 'inBar',
          color: themeColors?.primary as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 3 - 3]),
          position: 'inBar',
          color: themeColors?.primary as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 2 - 3]),
          position: 'inBar',
          color: themeColors?.primary as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 1 - 3]),
          position: 'aboveBar',
          color: themeColors?.primary as string,
          shape: 'arrowDown',
          text: '[1]',
        },
      ])
    }

    return () => {
      if (chartInstance.current && chartInstance2.current) {
        chartInstance.current.remove()
        toolTip.style.display = 'none'
        chartInstance.current = undefined
        chartInstance2.current.remove()
        chartInstance2.current = undefined
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    coin,
    dates,
    rollingWindow,
    studyCase,
    volatility,
    window,
    themeColors,
    setWindow,
    setVolatility,
    values,
    endDate,
    startDate,
  ])

  const getDates = () => {
    if (!dates) return
    const start: string = formatDateAmericanSimple(dates[startDate - 3])
    const end = formatDateAmericanSimple(dates[endDate - 3])

    return `${start} - ${end}`
  }

  return (
    <>
      {values && dates ? (
        <div className="flex items-start justify-between">
          <div className="mt-[3vh]">
            <div className="rounded-lg bg-eerie p-[5vh]">
              <div ref={chartContainerRef} style={{ width: '100%', height: '100%', position: 'relative' }} />
              <div className="mt-[2vh] block w-full">
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-1 w-[2vw] bg-offWhite"></div>
                  <span className="text-sm">
                    {coin.substring(0, coin.indexOf(' ')) ? coin.substring(0, coin.indexOf(' ')) : coin} - Daily Returns
                    %
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-sm">Rolling Window of 14 Days</span>
                </div>
              </div>
            </div>
            <div className="mt-5 rounded-lg bg-eerie p-[5vh]">
              <div ref={chartContainerRef2} style={{ width: '100%', height: '100%', position: 'relative' }} />

              <div className="mt-[2vh] block w-full">
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-1 w-[2vw] bg-primary"></div>
                  <span className="text-sm text-primary">90-Day Rolling Volatility</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-2 w-2 bg-offWhite"></div>
                  <p className="text-sm text-offWhite">BTC “Actual vol”</p>
                </div>
              </div>
              <div className="mt-[4vh] flex items-center justify-center space-x-5">
                <button
                  className="flex cursor-pointer items-center justify-center rounded-md bg-dark px-[2vw] py-[.5vh] text-center text-sm hover:scale-105 hover:text-primary"
                  onClick={() => decreaseDate(30)}
                >
                  <p className="text-lg">
                    <FontAwesomeIcon icon={['fas', 'backward' as IconName]} />
                  </p>
                  <p className="ml-2 text-xs">30</p>
                </button>
                <button
                  className="cursor-pointer rounded-sm bg-dark px-[2vw] py-[.5vh] text-center text-xl hover:scale-105 hover:text-primary"
                  onClick={() => decreaseDate(1)}
                >
                  <p>
                    <FontAwesomeIcon icon={['fas', 'caret-left' as IconName]} />
                  </p>
                </button>

                <p className="rounded-md text-sm text-grey">{getDates()}</p>
                <button
                  className="cursor-pointer rounded-sm bg-dark px-[2vw] py-[.5vh] text-center text-xl hover:scale-105 hover:text-primary"
                  onClick={() => incrementDate(1)}
                >
                  <p>
                    <FontAwesomeIcon icon={['fas', 'caret-right' as IconName]} />
                  </p>
                </button>
                <button
                  className="flex cursor-pointer items-center justify-center rounded-md bg-dark px-[2vw] py-[.5vh] text-center text-sm hover:scale-105 hover:text-primary"
                  onClick={() => incrementDate(30)}
                >
                  <p className="mr-2 text-xs">30</p>
                  <p className="text-lg">
                    <FontAwesomeIcon icon={['fas', 'forward' as IconName]} />
                  </p>
                </button>
              </div>
            </div>
          </div>
          <div className="mx-auto w-[45%] space-y-[2vh] px-[2vw] text-lg">
            <p className="mx-auto mt-[4vh] flex items-center text-justify text-lg">
              <b className="mr-[2vw] flex w-10 items-center justify-center rounded-lg bg-primary px-[1vw] py-[1vh] text-eerie">
                1
              </b>
              The “Actual Volatility” is the standard deviation of the daily returns of BTC over a specific period. Its
              calculated by looking at the last 14 days daily return.
            </p>
            <div className="mx-auto mt-[4vh] flex items-start text-justify text-lg">
              <b className="mr-[2vw] flex w-10 items-center justify-center rounded-lg bg-offWhite px-[1vw] py-[1vh] text-eerie">
                2
              </b>
              <div>
                <p>Calculate the average return of the first of these 14 days using Standard Deviation.</p>
                <div className="mx-auto mt-[4vh] flex items-center justify-start">
                  {results && (
                    <ul className="border-r pr-[2vw] text-sm">
                      <li className="text-left">
                        Day 1:{' '}
                        <b className={`${results[results.length - 15] < 0 ? 'text-fire' : 'text-spring'}`}>
                          {(results[results.length - 15] * 100).toFixed(2)}%
                        </b>
                      </li>
                      <li className="text-left">
                        Day 2:{' '}
                        <b className={`${results[results.length - 14] < 0 ? 'text-fire' : 'text-spring'}`}>
                          {(results[results.length - 14] * 100).toFixed(2)}%
                        </b>
                      </li>
                      <li className="text-left">
                        Day 3:{' '}
                        <b className={`${results[results.length - 13] < 0 ? 'text-fire' : 'text-spring'}`}>
                          {(results[results.length - 13] * 100).toFixed(2)}%
                        </b>
                      </li>
                      <li className="text-left">
                        Day 4:{' '}
                        <b className={`${results[results.length - 12] < 0 ? 'text-fire' : 'text-spring'}`}>
                          {(results[results.length - 12] * 100).toFixed(2)}%
                        </b>
                      </li>
                      <li className="text-left">
                        Day 5:{' '}
                        <b className={`${results[results.length - 11] < 0 ? 'text-fire' : 'text-spring'}`}>
                          {(results[results.length - 11] * 100).toFixed(2)}%
                        </b>
                      </li>
                      <li className="text-left">
                        Day 6:{' '}
                        <b className={`${results[results.length - 10] < 0 ? 'text-fire' : 'text-spring'}`}>
                          {(results[results.length - 10] * 100).toFixed(2)}%
                        </b>
                      </li>
                      <li className="text-left">
                        Day 7:{' '}
                        <b className={`${results[results.length - 9] < 0 ? 'text-fire' : 'text-spring'}`}>
                          {(results[results.length - 9] * 100).toFixed(2)}%
                        </b>
                      </li>
                      <li className="text-left">
                        Day 8:{' '}
                        <b className={`${results[results.length - 8] < 0 ? 'text-fire' : 'text-spring'}`}>
                          {(results[results.length - 8] * 100).toFixed(2)}%
                        </b>
                      </li>
                      <li className="text-left">
                        Day 9:{' '}
                        <b className={`${results[results.length - 7] < 0 ? 'text-fire' : 'text-spring'}`}>
                          {(results[results.length - 7] * 100).toFixed(2)}%
                        </b>
                      </li>
                      <li className="text-left">
                        Day 10:{' '}
                        <b className={`${results[results.length - 6] < 0 ? 'text-fire' : 'text-spring'}`}>
                          {(results[results.length - 6] * 100).toFixed(2)}%
                        </b>
                      </li>
                      <li className="text-left">
                        Day 11:{' '}
                        <b className={`${results[results.length - 5] < 0 ? 'text-fire' : 'text-spring'}`}>
                          {(results[results.length - 5] * 100).toFixed(2)}%
                        </b>
                      </li>
                      <li className="text-left">
                        Day 12:{' '}
                        <b className={`${results[results.length - 4] < 0 ? 'text-fire' : 'text-spring'}`}>
                          {(results[results.length - 4] * 100).toFixed(2)}%
                        </b>
                      </li>
                      <li className="text-left">
                        Day 13:{' '}
                        <b className={`${results[results.length - 3] < 0 ? 'text-fire' : 'text-spring'}`}>
                          {(results[results.length - 3] * 100).toFixed(2)}%
                        </b>
                      </li>
                      <li className="text-left">
                        Day 14:{' '}
                        <b className={`${results[results.length - 2] < 0 ? 'text-fire' : 'text-spring'}`}>
                          {(results[results.length - 2] * 100).toFixed(2)}%
                        </b>
                      </li>
                    </ul>
                  )}
                  {results && (
                    <p className="ml-[2vw]">
                      {' '}
                      ={' '}
                      {(
                        calculateStd(results.slice(results.length - 15, results.length - 2)) *
                        100 *
                        Math.sqrt(365)
                      ).toFixed(2)}
                      % = Actual Volatility
                    </p>
                  )}
                </div>
                <p className="mx-auto mt-[4vh] text-justify text-xs">
                  <b className="text-primary">Why did we choose a 14 day window ?</b>
                  <br /> This parameter closely approximates the one that maximized the Sharpe Ratio over a four-year
                  period. It was chosen based on fundamental reasoning rather than being an arbitrary selection; for
                  instance, a two-week lookback period is more logical and justifiable compared to 10 or 11 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-md text-center text-primary">Loading ... </p>
      )}
    </>
  )
}

export default GraphTwo
