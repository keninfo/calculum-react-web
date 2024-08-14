'use client'

import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, { useContext, useEffect, useRef, useState } from 'react'

import { OptionsContext, ProContext, CoinsContext } from '@/components/AppProviders'
import {
  calculateCumulativeReturns,
  calculateRolling,
  calculateScaledReturnsLeverage,
  calculateStd,
  pct_change,
} from '@/components/ChartsContainer/chartComputations'
import { lineChartConfig, tooltipConfig, toolTipWidth, zeroLine } from '@/components/ChartsContainer/chartConfig'
import { classicTheme, proTheme } from '@/styles/colors'
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

    const chartDataPrice2: PriceChartData[] = cumulativeReturns.map((data, index) => ({
      time: formatDate(datesFiltered[index]) as Time,
      value: data * 100,
    }))

    const lineSeries3 = chartInstance.current?.addLineSeries({
      color: themeColors?.carmesi,
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
        const data2 = lineSeries3
          ? (param.seriesData.get(lineSeries3) as { value?: number; close?: number })
          : undefined
        const scaled = data2?.value !== undefined ? data2.value : data2?.close
        const rolling = data1?.value !== undefined ? data1.value : data1?.close
        if (rolling !== undefined) {
          toolTip.innerHTML = `<div style="color: var(--color-white)">BTC</div>
            <div style="position: absolute; bottom: 0; left: 0; width: 100%; background-color: var(--color-smoke); color: var(--color-white); text-align: center; padding-top: 4px; padding-bottom: 8px;">
            <p style="font-size: 10px; margin: 4px 0px; color: var(--color-carmesi); font-weight: bold;">
                RoC Scaled: ${scaled?.toFixed(0)}%</p>    
            <p style="font-size: 10px; margin: 4px 0px; color: var(--color-white); font-weight: bold;">
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
        color: hexToRGBA(themeColors?.white as string, 0.25),
      })
      lineSeries1.setMarkers([
        {
          time: formatDate(dates[endDate - 1 - 1]),
          position: 'aboveBar',
          color: 'white',
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
      lineSeries3.createPriceLine({ ...zeroLine, color: hexToRGBA(themeColors?.white as string, 0.25) })
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
        <div className="flex justify-between items-start">
          <div className="mt-[3vh]">
            <div className="bg-smoke p-[5vh] rounded-lg">
              <div ref={chartContainerRef2} style={{ width: '100%', height: '100%', position: 'relative' }} />

              <div className="block w-full mt-[2vh]">
                <div className="flex items-center justify-center  space-x-2">
                  <div className="w-[2vw] h-1 bg-carmesi"></div>
                  <span className="text-sm text-carmesi">90-Day Rolling Volatility</span>
                </div>
              </div>
            </div>
            <div className="bg-smoke p-[5vh] rounded-lg">
              <div ref={chartContainerRef} style={{ width: '100%', height: '100%', position: 'relative' }} />
              <div className="block w-full mt-[2vh]">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-[2vw] h-1 bg-white"></div>
                  <span className="text-sm">
                    {coin.substring(0, coin.indexOf(' ')) ? coin.substring(0, coin.indexOf(' ')) : coin} - RoC %
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-[2vw] h-1 bg-carmesi"></div>
                  <p className="text-carmesi text-sm">
                    {coin.substring(0, coin.indexOf(' ')) ? coin.substring(0, coin.indexOf(' ')) : coin} Smoothcoin -
                    RoC %
                  </p>
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

          {rawOnly ? (
            <div className="space-y-[2vh] text-lg w-[40%] mx-auto px-[2vw]">
              <p className="mt-[4vh] text-lg mx-auto text-justify flex items-center">
                <b className="bg-carmesi text-white py-[1vh] px-[1vw] mr-[2vw] rounded-lg">1</b>The “Actual Volatility”
                is the standard deviation of the daily returns of BTC over a specific period. Its calculated by looking
                at the last 14 days daily return.
              </p>
              <p className="mt-[4vh] text-lg mx-auto text-justify flex items-center">
                <b className="bg-white text-carmesi py-[1vh] px-[1vw] mr-[2vw] rounded-lg">2</b>Calculate the average
                return of the first of these 14 days using Standard Deviation.
              </p>
              <div className="flex justify-start items-center mx-auto mt-[4vh]">
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
              <p className="mt-[4vh] text-xs mx-auto text-justify flex items-center">
                Why did we choose a 14 day window ?<br /> This parameter closely approximates the one that maximized the
                Sharpe Ratio over a four-year period. It was chosen based on fundamental reasoning rather than being an
                arbitrary selection; for instance, a two-week lookback period is more logical and justifiable compared
                to 10 or 11 days.
              </p>
            </div>
          ) : (
            <div className="space-y-[2vh] text-lg w-[40%] mx-auto px-[2vw]">
              <p className="mt-[4vh] text-lg mx-auto text-justify flex items-center">
                <b className="bg-carmesi text-white py-[1vh] px-[1vw] mr-[2vw] rounded-lg">1</b>If volatility target =
                20%.
              </p>
              {results && (
                <div className="mt-[4vh] text-lg mx-auto text-justify flex items-start">
                  <b className="bg-white text-carmesi py-[1vh] px-[1vw] mr-[2vw] rounded-lg">2</b>
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
                      <b className="text-carmesi">
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
                      <b className="text-carmesi">
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
        <p className="text-center text-md text-carmesi">Loading ... </p>
      )}
    </>
  )
}

export default GraphThree
