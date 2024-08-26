'use client'

import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, { useContext, useEffect, useRef, useState } from 'react'

import { OptionsContext, ProContext, CoinsContext } from '@/components/AppProviders'
import { lineChartConfig, tooltipConfig, toolTipWidth, zeroLine } from '@/components/ChartsContainer/chartConfig'
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
  darkness: string
  smoke: string
  carmesi: string
  white: string
  greySmoke: string
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
  const { coin, window, rollingWindow, volatility, studyCase, setWindow, setVolatility } = useContext(OptionsContext)
  const { pro } = useContext(ProContext)

  const [themeColors, setThemeColors] = useState<ThemeColorsType | null>(null)

  const getCoinArray = () => {
    return values ? values[1] : []
  }
  const [results, setResults] = useState<number[] | null>(null)

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
          textColor: themeColors?.white,
        },
        leftPriceScale: {
          ...lineChartConfig.leftPriceScale,
          mode: 0,
        },
        crosshair: {
          ...lineChartConfig.crosshair,
          vertLine: { ...lineChartConfig.crosshair.vertLine, color: hexToRGBA(themeColors?.white as string, 0.1) },
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
          textColor: themeColors?.white,
        },
        crosshair: {
          ...lineChartConfig.crosshair,
          vertLine: { ...lineChartConfig.crosshair.vertLine, color: hexToRGBA(themeColors?.white as string, 0.1) },
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
      color: themeColors?.carmesi as string,
      priceScaleId: 'left',

      lastValueVisible: false,
    })

    const chartDataPrice1: PriceChartData[] = rolled.map((data, index) => ({
      time: formatDate(datesFiltered[index]) as Time,
      value: data * 100,
    }))

    const lineSeries2 = chartInstance.current?.addLineSeries({
      color: themeColors?.white,
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
        if (rolling !== undefined) {
          toolTip.innerHTML = `<div style="color: var(--color-white)">BTC</div>
            <div style="position: absolute; bottom: 0; left: 0; width: 100%; background-color: var(--color-smoke); color: var(--color-white); text-align: center; padding-top: 4px; padding-bottom: 8px;">
            <p style="font-size: 10px; margin: 4px 0px; color: var(--color-white); font-weight: bold;">
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

    toolTip2.style.background = hexToRGBA(themeColors?.white as string, 0.1)
    toolTip2.style.color = 'var(--color-white)'

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
          toolTip2.innerHTML = `<div style="color: var(--color-white)">BTC</div>
          <div style="position: absolute; bottom: 0; left: 0; width: 100%; background-color: var(--color-smoke); color: var(--color-white); text-align: center; padding-top: 4px; padding-bottom: 8px;">
            <p style="font-size: 10px; margin: 4px 0px; color: var(--color-carmesi); font-weight: bold;">
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
        color: hexToRGBA(themeColors?.white as string, 0.25),
      })
      lineSeries1.setMarkers([
        {
          time: formatDate(dates[endDate - 1 - 3]),
          position: 'aboveBar',
          color: themeColors?.carmesi as string,
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
          color: themeColors?.carmesi as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 13 - 3]),
          position: 'inBar',
          color: themeColors?.carmesi as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 12 - 3]),
          position: 'inBar',
          color: themeColors?.carmesi as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 11 - 3]),
          position: 'inBar',
          color: themeColors?.carmesi as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 10 - 3]),
          position: 'inBar',
          color: themeColors?.carmesi as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 9 - 3]),
          position: 'inBar',
          color: themeColors?.carmesi as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 8 - 3]),
          position: 'inBar',
          color: themeColors?.carmesi as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 7 - 3]),
          position: 'inBar',
          color: themeColors?.carmesi as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 6 - 3]),
          position: 'inBar',
          color: themeColors?.carmesi as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 5 - 3]),
          position: 'inBar',
          color: themeColors?.carmesi as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 4 - 3]),
          position: 'inBar',
          color: themeColors?.carmesi as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 3 - 3]),
          position: 'inBar',
          color: themeColors?.carmesi as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 2 - 3]),
          position: 'inBar',
          color: themeColors?.carmesi as string,
          shape: 'circle',
        },
        {
          time: formatDate(dates[endDate - 1 - 3]),
          position: 'aboveBar',
          color: themeColors?.carmesi as string,
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
        <div className="flex justify-between items-start">
          <div className="mt-[3vh]">
            <div className="bg-smoke p-[5vh] rounded-lg">
              <div ref={chartContainerRef} style={{ width: '100%', height: '100%', position: 'relative' }} />
              <div className="block w-full mt-[2vh]">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-[2vw] h-1 bg-white"></div>
                  <span className="text-sm">
                    {coin.substring(0, coin.indexOf(' ')) ? coin.substring(0, coin.indexOf(' ')) : coin} - Daily Returns
                    %
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-carmesi rounded-full"></div>
                  <span className="text-sm">Rolling Window of 14 Days</span>
                </div>
              </div>
            </div>
            <div className="bg-smoke p-[5vh] rounded-lg">
              <div ref={chartContainerRef2} style={{ width: '100%', height: '100%', position: 'relative' }} />

              <div className="block w-full mt-[2vh]">
                <div className="flex items-center justify-center  space-x-2">
                  <div className="w-[2vw] h-1 bg-carmesi"></div>
                  <span className="text-sm text-carmesi">90-Day Rolling Volatility</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-white"></div>
                  <p className="text-white text-sm">BTC “Actual vol”</p>
                </div>
              </div>
              <div className="flex justify-center items-center mt-[4vh] space-x-10">
                <button
                  className="flex justify-center items-center text-center text-sm cursor-pointer bg-darkness rounded-md px-[2vw] py-[.5vh] hover:text-carmesi hover:scale-105"
                  onClick={() => decreaseDate(30)}
                >
                  <p className="text-lg">
                    <FontAwesomeIcon icon={['fas', 'backward' as IconName]} />
                  </p>
                  <p className="text-xs ml-2">30</p>
                </button>
                <button
                  className="text-center text-xl cursor-pointer bg-darkness rounded-sm px-[2vw] py-[.5vh] hover:text-carmesi hover:scale-105"
                  onClick={() => decreaseDate(1)}
                >
                  <p>
                    <FontAwesomeIcon icon={['fas', 'caret-left' as IconName]} />
                  </p>
                </button>

                <p className=" text-greySmoke text-sm rounded-md">{getDates()}</p>
                <button
                  className="text-center text-xl cursor-pointer bg-darkness rounded-sm px-[2vw] py-[.5vh] hover:text-carmesi hover:scale-105"
                  onClick={() => incrementDate(1)}
                >
                  <p>
                    <FontAwesomeIcon icon={['fas', 'caret-right' as IconName]} />
                  </p>
                </button>
                <button
                  className="flex justify-center items-center text-center text-sm cursor-pointer bg-darkness rounded-md px-[2vw] py-[.5vh] hover:text-carmesi hover:scale-105"
                  onClick={() => incrementDate(30)}
                >
                  <p className="text-xs mr-2">30</p>
                  <p className="text-lg">
                    <FontAwesomeIcon icon={['fas', 'forward' as IconName]} />
                  </p>
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-[2vh] text-lg w-[40%] mx-auto px-[2vw]">
            <p className="mt-[4vh] text-lg mx-auto text-justify flex items-center">
              <b className="bg-carmesi text-white py-[1vh] px-[1vw] mr-[2vw] rounded-lg">1</b>The “Actual Volatility” is
              the standard deviation of the daily returns of BTC over a specific period. Its calculated by looking at
              the last 14 days daily return.
            </p>
            <div className="mt-[4vh] text-lg mx-auto text-justify flex items-start">
              <b className="bg-white text-carmesi py-[1vh] px-[1vw] mr-[2vw] rounded-lg">2</b>
              <div>
                <p>Calculate the average return of the first of these 14 days using Standard Deviation.</p>
                <div className="flex justify-start items-center mx-auto mt-[4vh]">
                  {results && (
                    <ul className="border-r pr-[2vw] text-sm">
                      <li className="text-left">
                        Day 1: <b className="text-carmesi">{(results[results.length - 15] * 100).toFixed(2)}%</b>
                      </li>
                      <li className="text-left">
                        Day 2: <b className="text-carmesi">{(results[results.length - 14] * 100).toFixed(2)}%</b>
                      </li>
                      <li className="text-left">
                        Day 3: <b className="text-carmesi">{(results[results.length - 13] * 100).toFixed(2)}%</b>
                      </li>
                      <li className="text-left">
                        Day 4: <b className="text-carmesi">{(results[results.length - 12] * 100).toFixed(2)}%</b>
                      </li>
                      <li className="text-left">
                        Day 5: <b className="text-carmesi">{(results[results.length - 11] * 100).toFixed(2)}%</b>
                      </li>
                      <li className="text-left">
                        Day 6: <b className="text-carmesi">{(results[results.length - 10] * 100).toFixed(2)}%</b>
                      </li>
                      <li className="text-left">
                        Day 7: <b className="text-carmesi">{(results[results.length - 9] * 100).toFixed(2)}%</b>
                      </li>
                      <li className="text-left">
                        Day 8: <b className="text-carmesi">{(results[results.length - 8] * 100).toFixed(2)}%</b>
                      </li>
                      <li className="text-left">
                        Day 9: <b className="text-carmesi">{(results[results.length - 7] * 100).toFixed(2)}%</b>
                      </li>
                      <li className="text-left">
                        Day 10: <b className="text-carmesi">{(results[results.length - 6] * 100).toFixed(2)}%</b>
                      </li>
                      <li className="text-left">
                        Day 11: <b className="text-carmesi">{(results[results.length - 5] * 100).toFixed(2)}%</b>
                      </li>
                      <li className="text-left">
                        Day 12: <b className="text-carmesi">{(results[results.length - 4] * 100).toFixed(2)}%</b>
                      </li>
                      <li className="text-left">
                        Day 13: <b className="text-carmesi">{(results[results.length - 3] * 100).toFixed(2)}%</b>
                      </li>
                      <li className="text-left">
                        Day 14: <b className="text-carmesi">{(results[results.length - 2] * 100).toFixed(2)}%</b>
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
                <p className="mt-[4vh] text-xs mx-auto text-justify">
                  <b className="text-carmesi">Why did we choose a 14 day window ?</b>
                  <br /> This parameter closely approximates the one that maximized the Sharpe Ratio over a four-year
                  period. It was chosen based on fundamental reasoning rather than being an arbitrary selection; for
                  instance, a two-week lookback period is more logical and justifiable compared to 10 or 11 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-md text-carmesi">Loading ... </p>
      )}
    </>
  )
}

export default GraphTwo
