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
  calculateStd,
  pct_change,
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

interface GraphThreeProps {
  startDate: number
  endDate: number
  incrementDate: (days: number) => void
  decreaseDate: (days: number) => void
  rawOnly?: boolean
}

const GraphThree = ({ startDate, endDate, incrementDate, decreaseDate, rawOnly = true }: GraphThreeProps) => {
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

    const chartDataPrice2: PriceChartData[] = cumulativeReturns.map((data, index) => ({
      time: formatDate(datesFiltered[index]) as Time,
      value: data * 100,
    }))

    const lineSeries3 = chartInstance.current?.addLineSeries({
      color: themeColors?.primary,
      priceScaleId: 'left',
    })

    const chartDataPrice3: PriceChartData[] = cumulativeReturnsScaledSliced.map((data, index) => ({
      time: formatDate(datesFiltered[index]) as Time,
      value: data * 100,
    }))

    lineSeries1?.setData(chartDataPrice1)
    lineSeries2?.setData(chartDataPrice2)
    if (!rawOnly) {
      lineSeries3?.setData(chartDataPrice3)
    }

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
        const data2 = lineSeries3
          ? (param.seriesData.get(lineSeries3) as { value?: number; close?: number })
          : undefined
        const scaled = data2?.value !== undefined ? data2.value : data2?.close
        const rolling = data1?.value !== undefined ? data1.value : data1?.close
        if (rolling !== undefined) {
          toolTip.innerHTML = `<div style="color: var(--color-offWhite)">BTC</div>
            <div style="position: absolute; bottom: 0; left: 0; width: 100%; background-color: var(--color-eerie); color: var(--color-offWhite); text-align: center; padding-top: 4px; padding-bottom: 8px;">
            <p style="font-size: 10px; margin: 4px 0px; color: var(--color-primary); font-weight: bold;">
                RoC Scaled: ${scaled?.toFixed(0)}%</p>    
            <p style="font-size: 10px; margin: 4px 0px; color: var(--color-offWhite); font-weight: bold;">
                RoC Raw: ${rolling?.toFixed(0)}%</p>
                
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
            <p style="font-size: 10px; margin: 4px 0px; color: SteelBlue; font-weight: bold;">
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

    if (lineSeries1 && rawOnly) {
      lineSeries1.createPriceLine({
        ...zeroLine,
        price: 0,
        color: hexToRGBA(themeColors?.offWhite as string, 0.25),
      })
      lineSeries1.setMarkers([
        {
          time: formatDate(dates[endDate - 1 - 1]),
          position: 'aboveBar',
          color: 'offWhite',
          shape: 'arrowDown',
          text: '[2]',
        },
      ])
    }

    if (lineSeries2 && rawOnly) {
      lineSeries2.setMarkers([
        {
          time: formatDate(dates[endDate - 14 - 1]),
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 13 - 1]),
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 12 - 1]),
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 11 - 1]),
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 10 - 1]),
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 9 - 1]),
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 8 - 1]),
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 7 - 1]),
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 6 - 1]),
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 5 - 1]),
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 4 - 1]),
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 3 - 1]),
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 2 - 1]),
          position: 'inBar',
          color: 'red',
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 1 - 1]),
          position: 'aboveBar',
          color: 'red',
          shape: 'arrowDown',
          text: '[1]',
        },
      ])
    }

    if (lineSeries3 && !rawOnly) {
      lineSeries3.createPriceLine({ ...zeroLine, color: hexToRGBA(themeColors?.offWhite as string, 0.25) })
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
    rawOnly,
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
              <div ref={chartContainerRef2} style={{ width: '100%', height: '100%', position: 'relative' }} />

              <div className="mt-[2vh] block w-full">
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-1 w-[2vw] bg-primary"></div>
                  <span className="text-sm text-primary">90-Day Rolling Volatility</span>
                </div>
              </div>
            </div>
            <div className="mt-5 rounded-lg bg-eerie p-[5vh]">
              <div ref={chartContainerRef} style={{ width: '100%', height: '100%', position: 'relative' }} />
              <div className="mt-[2vh] block w-full">
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-1 w-[2vw] bg-offWhite"></div>
                  <span className="text-sm">
                    {coin.substring(0, coin.indexOf(' ')) ? coin.substring(0, coin.indexOf(' ')) : coin} - RoC %
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-1 w-[2vw] bg-primary"></div>
                  <p className="text-sm text-primary">
                    {coin.substring(0, coin.indexOf(' ')) ? coin.substring(0, coin.indexOf(' ')) : coin} Smoothcoin -
                    RoC %
                  </p>
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

          {rawOnly ? (
            <div className="mx-auto w-[45%] space-y-[2vh] px-[2vw] text-lg">
              <p className="mx-auto mt-[4vh] flex items-center text-justify text-lg">
                <b className="mr-[2vw] rounded-lg bg-primary px-[1vw] py-[1vh] text-offWhite">1</b>The “Actual
                Volatility” is the standard deviation of the daily returns of BTC over a specific period. Its calculated
                by looking at the last 14 days daily return.
              </p>
              <p className="mx-auto mt-[4vh] flex items-center text-justify text-lg">
                <b className="mr-[2vw] rounded-lg bg-offWhite px-[1vw] py-[1vh] text-primary">2</b>Calculate the average
                return of the first of these 14 days using Standard Deviation.
              </p>
              <div className="mx-auto mt-[4vh] flex items-center justify-start">
                {results && (
                  <ul className="flex border-r pr-[2vw]">
                    <li className="text-center">Day 1: {results[results.length - 14]}%</li>
                    <li className="text-center">Day 2: {results[results.length - 13]}%</li>
                    <li className="text-center">Day 3: {results[results.length - 12]}%</li>
                    <li className="text-center">Day 4: {results[results.length - 11]}%</li>
                    <li className="text-center">Day 5: {results[results.length - 10]}%</li>
                    <li className="text-center">Day 6: {results[results.length - 9]}%</li>
                    <li className="text-center">Day 7: {results[results.length - 8]}%</li>
                    <li className="text-center">Day 8: {results[results.length - 7]}%</li>
                    <li className="text-center">Day 9: {results[results.length - 6]}%</li>
                    <li className="text-center">Day 10: {results[results.length - 5]}%</li>
                    <li className="text-center">Day 11: {results[results.length - 4]}%</li>
                    <li className="text-center">Day 12: {results[results.length - 3]}%</li>
                    <li className="text-center">Day 14: {results[results.length - 1]}%</li>
                    <li className="text-center">Day 13: {results[results.length - 2]}%</li>
                  </ul>
                )}
                <p className="ml-[2vw]"> = ????? = Actual Volatility</p>
              </div>
              <p className="mx-auto mt-[4vh] flex items-center text-justify text-xs">
                Why did we choose a 14 day window ?<br /> This parameter closely approximates the one that maximized the
                Sharpe Ratio over a four-year period. It was chosen based on fundamental reasoning rather than being an
                arbitrary selection; for instance, a two-week lookback period is more logical and justifiable compared
                to 10 or 11 days.
              </p>
            </div>
          ) : (
            <div className="mx-auto w-[40%] space-y-[2vh] px-[2vw] text-lg">
              <p className="mx-auto mt-[4vh] flex items-center text-justify text-lg">
                <b className="mr-[2vw] rounded-lg bg-primary px-[1vw] py-[1vh] text-offWhite">1</b>If volatility target
                = 20%.
              </p>
              {results && (
                <div className="mx-auto mt-[4vh] flex items-start text-justify text-lg">
                  <b className="mr-[2vw] rounded-lg bg-offWhite px-[1vw] py-[1vh] text-primary">2</b>
                  <div>
                    <p>
                      Actual volatility ={' '}
                      {(
                        calculateStd(results.slice(results.length - 15, results.length - 2)) *
                        100 *
                        Math.sqrt(365)
                      ).toFixed(2)}
                      %{' '}
                    </p>
                    <p className="mt-[2vh]">We divide target volatility by actual volatility: </p>
                    <p>
                      20% /{' '}
                      {(
                        calculateStd(results.slice(results.length - 15, results.length - 2)) *
                        100 *
                        Math.sqrt(365)
                      ).toFixed(2)}
                      % ={' '}
                      {(
                        (20 /
                          (calculateStd(results.slice(results.length - 15, results.length - 2)) *
                            100 *
                            Math.sqrt(365))) *
                        100
                      ).toFixed(2)}
                      %
                    </p>
                    <p className="mt-[2vh]">We subtract from 100%: </p>
                    <p>
                      100% -{' '}
                      {(
                        (20 /
                          (calculateStd(results.slice(results.length - 15, results.length - 2)) *
                            100 *
                            Math.sqrt(365))) *
                        100
                      ).toFixed(2)}
                      % ={' '}
                      {(
                        100 -
                        (20 /
                          (calculateStd(results.slice(results.length - 15, results.length - 2)) *
                            100 *
                            Math.sqrt(365))) *
                          100
                      ).toFixed(2)}
                      %
                    </p>
                    <p className="mt-[2vh]">
                      We get that we must invest{' '}
                      <b className="text-primary">
                        {(
                          (20 /
                            (calculateStd(results.slice(results.length - 15, results.length - 2)) *
                              100 *
                              Math.sqrt(365))) *
                          100
                        ).toFixed(2)}
                        %
                      </b>{' '}
                      BTC and{' '}
                      <b className="text-primary">
                        {(
                          100 -
                          (20 /
                            (calculateStd(results.slice(results.length - 15, results.length - 2)) *
                              100 *
                              Math.sqrt(365))) *
                            100
                        ).toFixed(2)}
                        %
                      </b>{' '}
                      Cash
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <p className="text-md text-center text-primary">Loading ... </p>
      )}
    </>
  )
}

export default GraphThree
