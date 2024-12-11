import { useMediaQuery } from '@uidotdev/usehooks'

import React, { useEffect, useRef, useState } from 'react'

import { useOptionsStore } from '@/store/useOptionsStore'
import { useProStore } from '@/store/useProStore'
import { useStrategyStore } from '@/store/useStrategyStore'
import { classicTheme, proTheme } from '@/styles/colors'
import { hexToRGBA, formatDateAmerican } from '@/utils/formatters'

import { lineChartConfig, tooltipConfig, toolTipWidth, zeroLine } from '../chartConfig'

import * as d3 from 'd3'
import type { IChartApi, UTCTimestamp } from 'lightweight-charts'
import { ColorType, createChart, type Time } from 'lightweight-charts'

interface PriceChartData {
  time: Time
  value: number
}

interface ThemeColorsType {
  offWhite: string
  eerie: string
  primary: string
  grey: string
  robin: string
  citron: string
}

interface Props {
  BTCRaw: boolean
  ETHRaw: boolean
  SOLRaw: boolean
}

const AlphaOne = ({ BTCRaw, ETHRaw, SOLRaw }: Props) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<IChartApi | undefined>()
  const initialVisibleRange = useRef<{ from: Time; to: Time } | undefined>(undefined)
  const { coin } = useStrategyStore()
  const { pro } = useProStore()
  const { window } = useOptionsStore()

  const [dates, setDates] = useState<Date[]>([])
  const [closePrices, setClosePrices] = useState<number[][] | undefined>()
  const [returns, setReturns] = useState<number[][] | undefined>()
  const [signalReturns, setSignalReturns] = useState<number[][] | undefined>()
  const [basketSignal, setBasketSignal] = useState<string[]>()
  const [cumSignal, setCumSignal] = useState<string[]>()

  const [themeColors, setThemeColors] = useState<ThemeColorsType | null>(null)
  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)')

  console.log(returns)

  useEffect(() => {
    setThemeColors(
      pro
        ? {
            offWhite: proTheme.offWhite,
            eerie: proTheme.eerie,
            primary: proTheme.primary,
            grey: proTheme.grey,
            robin: proTheme.robin,
            citron: proTheme.citron,
          }
        : {
            offWhite: classicTheme.offWhite,
            eerie: classicTheme.eerie,
            primary: classicTheme.primary,
            grey: classicTheme.grey,
            robin: proTheme.robin,
            citron: proTheme.citron,
          },
    )
  }, [pro])

  const fetchMomentum = async () => {
    const staticDataSrc = `mom_basket60.csv`
    try {
      const staticData = await d3.csv(staticDataSrc, (d) => ({
        date: d.date!,
        closePrices: [+d[`close_price_BTCUSDT`]!, +d[`close_price_ETHUSDT`]!, +d[`close_price_SOLUSDT`]!],
        returns: [+d[`return_BTCUSDT`]!, +d[`return_ETHUSDT`]!, +d[`return_SOLUSDT`]!],
        signalReturns: [+d[`signal_return_BTCUSDT`]!, +d[`signal_return_ETHUSDT`]!, +d[`signal_return_SOLUSDT`]!],
        basketSignal: d.signal_basket_return!,
        cumSignal: d.cum_signal_basket_return!,
      }))

      const dates = staticData.map((d) => new Date(d.date))
      const closePriceData = staticData.map((d) => d.closePrices)
      const returnsData = staticData.map((d) => d.returns)
      const signalReturnsData = staticData.map((d) => d.signalReturns)
      const basketSignalData = staticData.map((d) => d.basketSignal)
      const cumSignalData = staticData.map((d) => d.cumSignal)

      setDates(dates.slice(-window))
      setClosePrices(closePriceData.slice(-window))
      setReturns(returnsData.slice(-window))
      setSignalReturns(signalReturnsData.slice(-window))
      setBasketSignal(basketSignalData.slice(-window))
      setCumSignal(cumSignalData.slice(-window))
    } catch (error) {
      console.error('Error fetching signalCumReturns data:', error)
    }
  }

  useEffect(() => {
    fetchMomentum()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coin, window])

  useEffect(() => {
    if (
      !chartContainerRef.current ||
      !themeColors ||
      dates.length === 0 ||
      !closePrices ||
      !basketSignal ||
      !signalReturns
    )
      return

    if (chartInstance.current) {
      chartInstance.current.remove()
    }

    chartInstance.current = createChart(chartContainerRef.current, {
      autoSize: true,
      height: isSmallDevice ? 200 : 400,
      ...lineChartConfig,
      layout: {
        ...lineChartConfig.layout,
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: themeColors.offWhite,
      },
      leftPriceScale: {
        ...lineChartConfig.leftPriceScale,
        mode: 1,
      },
      rightPriceScale: {
        ...lineChartConfig.rightPriceScale,
        visible: true,
        mode: 0,
      },
      crosshair: {
        ...lineChartConfig.crosshair,
        vertLine: { ...lineChartConfig.crosshair.vertLine, color: hexToRGBA(themeColors.offWhite, 0.1) },
      },
      localization: {
        dateFormat: "dd MMMM 'yy",
      },
    })

    const lineSeriesA = chartInstance.current?.addLineSeries({
      color: '#09d3ac',
      priceScaleId: 'left',
      priceFormat: {
        type: 'custom',
        formatter: (price: number) => {
          return `$${(price * 100).toFixed(2)}k`
        },
      },
    })

    const calculatedCumReturn: number[] = []
    let cumulativeProduct = 1

    if (coin == 'BTC') {
      signalReturns.forEach((dailyReturn) => {
        cumulativeProduct *= 1 + Number(dailyReturn[0])
        calculatedCumReturn.push(cumulativeProduct - 1)
      })
    }

    if (coin == 'BTC + ETH') {
      signalReturns.forEach((dailyReturn) => {
        cumulativeProduct *= 1 + Number(dailyReturn[0]) + Number(dailyReturn[1])
        calculatedCumReturn.push(cumulativeProduct - 1)
      })
    }

    if (coin == 'BTC + ETH + SOL') {
      signalReturns.forEach((dailyReturn) => {
        cumulativeProduct *= 1 + Number(dailyReturn[0]) + Number(dailyReturn[1]) + Number(dailyReturn[2])
        calculatedCumReturn.push(cumulativeProduct - 1)
      })
    }

    const calculatedPrice = calculatedCumReturn.map(
      (cumReturn) => (closePrices[0][0] / 100000) * (1 + Number(cumReturn)),
    )

    const chartDataPriceA: PriceChartData[] = calculatedPrice.map((data, index) => ({
      time: (dates[index].getTime() / 1000) as UTCTimestamp,
      value: data,
    }))

    lineSeriesA?.setData(chartDataPriceA)

    const lineSeries1 = chartInstance.current?.addLineSeries({
      color: themeColors.grey,
      priceScaleId: 'left',
      priceFormat: {
        type: 'custom',
        formatter: (price: number) => {
          return `$${(price * 100).toFixed(2)}k`
        },
      },
    })

    const chartDataPrice1: PriceChartData[] = closePrices.map((data, index) => ({
      time: (dates[index].getTime() / 1000) as UTCTimestamp,
      value: data[0] / 100000,
    }))

    lineSeries1?.setData(chartDataPrice1)

    const lineSeries2 = chartInstance.current?.addLineSeries({
      color: '#215CAF',
      priceScaleId: 'left',
      priceFormat: {
        type: 'custom',
        formatter: (price: number) => {
          return `$${(price * 100).toFixed(2)}k`
        },
      },
    })

    const chartDataPrice2: PriceChartData[] = closePrices.map((data, index) => ({
      time: (dates[index].getTime() / 1000) as UTCTimestamp,
      value: data[1] / 100000,
    }))

    lineSeries2?.setData(chartDataPrice2)

    const lineSeries3 = chartInstance.current?.addLineSeries({
      color: '#14F195',
      priceScaleId: 'left',
      priceFormat: {
        type: 'custom',
        formatter: (price: number) => {
          return `$${(price * 100).toFixed(2)}k`
        },
      },
    })

    const chartDataPrice3: PriceChartData[] = closePrices.map((data, index) => ({
      time: (dates[index].getTime() / 1000) as UTCTimestamp,
      value: data[2] / 100000,
    }))

    lineSeries3?.setData(chartDataPrice3)

    chartInstance.current?.priceScale('left').applyOptions({
      autoScale: false,
      scaleMargins: { top: 0.3, bottom: 0.1 }, // Adjust as needed
      mode: 1, // Regular price scale
    })

    chartInstance.current?.priceScale('right').applyOptions({
      autoScale: false,
      scaleMargins: { top: 0.2, bottom: 0.25 }, // Match left scale's visual margin
      mode: 1, // Regular price scale
    })

    const visibleRange = {
      from: (dates[0].getTime() / 1000) as UTCTimestamp,
      to: (dates[dates.length - 1].getTime() / 1000) as UTCTimestamp,
    }

    initialVisibleRange.current = visibleRange
    chartInstance.current?.timeScale().setVisibleRange(visibleRange)

    const toolTip = document.createElement('div')
    Object.assign(toolTip.style, {
      height: isSmallDevice ? '200px' : '400px',
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

        const dataA = lineSeriesA
          ? (param.seriesData.get(lineSeriesA) as { value?: number; close?: number })
          : undefined
        const Cumm = dataA?.value !== undefined ? dataA.value : dataA?.close
        const data1 = lineSeries1
          ? (param.seriesData.get(lineSeries1) as { value?: number; close?: number })
          : undefined
        const btcPrice = data1?.value !== undefined ? data1.value : data1?.close
        const data2 = lineSeries2
          ? (param.seriesData.get(lineSeries2) as { value?: number; close?: number })
          : undefined
        const ethPrice = data2?.value !== undefined ? data2.value : data2?.close
        const data3 = lineSeries3
          ? (param.seriesData.get(lineSeries3) as { value?: number; close?: number })
          : undefined
        const solPrice = data3?.value !== undefined ? data3.value : data3?.close

        toolTip.innerHTML = `
          <div>
          <p style="font-size: 10px; color:  #09d3ac; font-weight: bold;">
              Momentum ${(Number(Cumm) * 100000).toLocaleString('US')}
            </p>  
          ${
            BTCRaw
              ? `
            <p style="font-size: 10px; color: var(--color-grey); font-weight: bold;">
              BTC ${(Number(btcPrice) * 100000).toLocaleString('US')}
            </p>
          `
              : ''
          }
            ${
              ETHRaw
                ? `
            <p style="font-size: 10px; color: #215CAF; font-weight: bold;">
              ETH ${(Number(ethPrice) * 100000).toLocaleString('US')}
            </p>
          `
                : ''
            }
            ${
              SOLRaw
                ? `
            <p style="font-size: 10px; color: #14F195; font-weight: bold;">
              SOL ${(Number(solPrice) * 100000).toLocaleString('US')}
            </p>
          `
                : ''
            }
          </div>
          <div style="position: absolute; bottom: 0; left: 0; width: 100%; background-color: var(--color-dark); color: var(--color-offWhite); text-align: center; padding-top: 4px; padding-bottom: 8px;">
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
    })

    if (lineSeries1) {
      lineSeries1.createPriceLine({ ...zeroLine, color: hexToRGBA(themeColors.offWhite, 0.25) })
    }

    if (!BTCRaw) {
      chartInstance.current.removeSeries(lineSeries1)
    }
    if (!ETHRaw) {
      chartInstance.current.removeSeries(lineSeries2)
    }
    if (!SOLRaw) {
      chartInstance.current.removeSeries(lineSeries3)
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.remove()
        toolTip.style.display = 'none'
        chartInstance.current = undefined
      }
    }
  }, [
    dates,
    themeColors,
    coin,
    isSmallDevice,
    window,
    closePrices,
    BTCRaw,
    ETHRaw,
    SOLRaw,
    cumSignal,
    basketSignal,
    signalReturns,
  ])

  return (
    <div className="relative">
      <div
        ref={chartContainerRef}
        style={{ width: '100%', height: '100%', position: 'relative', marginTop: isSmallDevice ? '40px' : '20px' }}
      />
    </div>
  )
}

export default AlphaOne
