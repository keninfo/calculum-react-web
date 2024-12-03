import { useMediaQuery } from '@uidotdev/usehooks'

import React, { useEffect, useRef, useState } from 'react'

import { useOptionsStore } from '@/store/useOptionsStore'
import { useProStore } from '@/store/useProStore'
import { useStrategyStore } from '@/store/useStrategyStore'
import { classicTheme, proTheme } from '@/styles/colors'
import { formatDateAmerican, hexToRGBA } from '@/utils/formatters'

import { lineChartConfig, tooltipConfig, toolTipWidth, zeroLine } from '../chartConfig'

import * as d3 from 'd3'
import type { IChartApi, Time, UTCTimestamp } from 'lightweight-charts'
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
  robin: string
}

const Momentum = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<IChartApi | undefined>()
  const initialVisibleRange = useRef<{ from: Time; to: Time } | undefined>(undefined)
  const { coin, strategy } = useStrategyStore()
  const { pro } = useProStore()
  const { studyCase, window, setStudyCase } = useOptionsStore()

  const [closePrice, setClosePrice] = useState<string[]>([])
  const [assetCumReturns, setAssetCumReturns] = useState<number[]>([])
  const [signalCumReturns, setSignalCumReturns] = useState<number[]>([])
  const [signalPrice, setSignalPrice] = useState<number[]>([])
  // const [signalReturn, setSignalReturns] = useState<number[]>([])
  // const [ROC, setROC] = useState<number[]>([])

  const [dates, setDates] = useState<Date[]>([])

  const [themeColors, setThemeColors] = useState<ThemeColorsType | null>(null)
  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)')

  useEffect(() => {
    setThemeColors(
      pro
        ? {
            dark: proTheme.dark,
            eerie: proTheme.eerie,
            primary: proTheme.primary,
            offWhite: proTheme.offWhite,
            grey: proTheme.grey,
            robin: proTheme.robin,
          }
        : {
            dark: classicTheme.dark,
            eerie: classicTheme.eerie,
            primary: classicTheme.primary,
            offWhite: classicTheme.offWhite,
            grey: classicTheme.grey,
            robin: proTheme.robin,
          },
    )
  }, [pro])

  const fetchMomentum = async () => {
    const staticDataSrc = `csv/${coin}USDT.csv`

    try {
      const staticData = await d3.csv(staticDataSrc, (d) => ({
        date: d.date!,
        closePrice: d[`close_price_${coin}USDT`]!, // Use dynamic property keys
        asset_return: +d[`return_${coin}USDT`]!,
        signal_return: +d[`signal_return_${coin}USDT`]!,
        asset_cum_return: +d[`cum_return_${coin}USDT`]!,
        signal_cum_return: +d[`cum_signal_return_${coin}USDT`]!,
        roc: 1,
      }))

      const dates = staticData.map((d) => new Date(d.date))
      const closePriceData = staticData.map((d) => d.closePrice)
      // const signalReturnsData = staticData.map((d) => d.signal_return)
      const assetCumReturnsData = staticData.map((d) => d.asset_cum_return)
      const signalCumReturnsData = staticData.map((d) => d.signal_cum_return)
      // const roc = staticData.map((d) => d.roc)

      const newSignalPrices = closePriceData.map((price, index) => {
        const assetPrice = Number(price) // Convert string to number
        const assetReturn = assetCumReturnsData[index] || 0 // Handle missing values safely
        const signalReturn = signalCumReturnsData[index] || 0

        // Calculate signal price
        return (assetPrice * (1 + signalReturn)) / (1 + assetReturn)
      })

      setSignalPrice(newSignalPrices)

      setDates(dates)
      setClosePrice(closePriceData)
      // setSignalReturns(signalReturnsData)
      setAssetCumReturns(assetCumReturnsData)
      setSignalCumReturns(signalCumReturnsData)
      // setROC(roc)
    } catch (error) {
      console.error('Error fetching signalCumReturns data:', error)
    }
  }

  useEffect(() => {
    fetchMomentum()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coin])

  // const filterSignalToDeploy = (data: number[], selectedDate: string): number[] => {
  //   const today = new Date()
  //   const targetDate = new Date(selectedDate)
  //   const daysDifference = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  //   return data.map((value, index) => {
  //     if (index < data.length - Math.abs(daysDifference)) {
  //       return 1
  //     }

  //     return value
  //   })
  // }

  useEffect(() => {
    if (
      !chartContainerRef.current ||
      !themeColors ||
      dates.length === 0 ||
      assetCumReturns.length === 0 ||
      signalCumReturns.length === 0
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
        mode: 1,
      },
      crosshair: {
        ...lineChartConfig.crosshair,
        vertLine: { ...lineChartConfig.crosshair.vertLine, color: hexToRGBA(themeColors.offWhite, 0.1) },
      },
      localization: {
        dateFormat: "dd MMMM 'yy",
      },
    })

    let selectedWindow = window

    if (studyCase == 1 && coin != '1000PEPE') {
      selectedWindow = closePrice.length - 573
    } else if (studyCase == 2 && coin != '1000PEPE') {
      selectedWindow = closePrice.length - 1486
    }

    if (coin == '1000PEPE') {
      setStudyCase(0)
    }

    const datesSliced = dates.slice(-selectedWindow)

    const lineSeries1 = chartInstance.current?.addLineSeries({
      color: themeColors.offWhite,
      priceScaleId: 'left',
      priceFormat: {
        type: 'custom',
        formatter: (price: number) => {
          return coin == '1000PEPE' || coin == 'DOGE' ? `$${price.toFixed(3)}` : `$${(price * 100).toFixed(0)}k`
        },
      },
    })

    let closePriceSliced = closePrice.map((value) =>
      coin == '1000PEPE' || coin == 'DOGE' ? Number(value) : Number(value) / 100000,
    )

    closePriceSliced = closePriceSliced.slice(-selectedWindow)

    const chartDataPrice1: PriceChartData[] = closePriceSliced.map((data, index) => ({
      time: (datesSliced[index].getTime() / 1000) as UTCTimestamp,
      value: data,
    }))

    lineSeries1?.setData(chartDataPrice1)

    const lineSeries2 = chartInstance.current?.addLineSeries({
      color: themeColors.primary,
      priceScaleId: 'right',
      priceFormat: {
        type: 'custom',
        formatter: (price: number) => {
          return `$${price.toLocaleString('US')}`
        },
      },
    })

    let signalCumReturnsSliced = signalPrice.map((value) =>
      coin == '1000PEPE' || coin == 'DOGE' ? Number(value) : Number(value) / 100000,
    )

    signalCumReturnsSliced = signalCumReturnsSliced.slice(-selectedWindow)

    const chartDataPrice2: PriceChartData[] = signalCumReturnsSliced.map((data, index) => ({
      time: (datesSliced[index].getTime() / 1000) as UTCTimestamp,
      value: data,
    }))

    lineSeries2?.setData(chartDataPrice2)

    // const lineSeries3 = chartInstance.current?.addLineSeries({
    //   color: themeColors.primary,
    //   priceScaleId: 'right',
    //   priceFormat: {
    //     type: 'custom',
    //     formatter: (price: number) => {
    //       return `$${price.toLocaleString('US')}`
    //     },
    //   },
    // })

    // let signalReturnSliced = signalPrice.map((value) =>
    //   coin == '1000PEPE' || coin == 'DOGE' ? Number(value) : Number(value) / 100000,
    // )

    // signalReturnSliced = filterSignalToDeploy(signalReturnSliced, '2024-11-03').slice(-selectedWindow)
    // let rocSliced = filterSignalToDeploy(signalReturnSliced, '2024-11-03').slice(-selectedWindow)

    // signalReturnSliced.map((value, index) => {
    //   if (value == 1) {
    //     return
    //   }
    //   const previous = ROC[index - 1]
    //   const Roc = (1 + previous) * value
    //   rocSliced[index] = Roc
    // })

    // const chartDataPrice3: PriceChartData[] = rocSliced
    //   .map((data, index) => ({
    //     time: (datesSliced[index].getTime() / 1000) as UTCTimestamp,
    //     value: data,
    //   }))

    // lineSeries3?.setData(chartDataPrice3)

    chartInstance.current?.priceScale('left').applyOptions({
      scaleMargins: { top: 0.45, bottom: 0.1 }, // Adjust as needed
      mode: 0, // Regular price scale
    })

    chartInstance.current?.priceScale('right').applyOptions({
      scaleMargins: { top: 0.2, bottom: 0.1 }, // Match left scale's visual margin
      mode: 0, // Regular price scale
    })

    const visibleRange = {
      from: (datesSliced[0].getTime() / 1000) as UTCTimestamp,
      to: (datesSliced[datesSliced.length - 1].getTime() / 1000) as UTCTimestamp,
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
        const data1 = lineSeries1
          ? (param.seriesData.get(lineSeries1) as { value?: number; close?: number })
          : undefined
        const assetCumReturns = data1?.value !== undefined ? data1.value : data1?.close
        const data2 = lineSeries2
          ? (param.seriesData.get(lineSeries2) as { value?: number; close?: number })
          : undefined
        const signalCumReturns = data2?.value !== undefined ? data2.value : data2?.close

        if (assetCumReturns !== undefined && signalCumReturns !== undefined) {
          if (assetCumReturns > signalCumReturns) {
            toolTip.innerHTML = `
          <div>
            <p style="font-size: 10px; color: ${themeColors?.offWhite}; font-weight: bold;">BTC: <br/> ${coin == '1000PEPE' || coin == 'DOGE' ? `$${assetCumReturns.toLocaleString('US')}` : `$${(assetCumReturns * 100).toFixed(0)}k`}</p>
            <p style="font-size: 10px; color: ${themeColors?.primary}; font-weight: bold;">Mom. BTC: <br/> $${signalCumReturns.toLocaleString('US')}</p>
          </div>
          <div style="position: absolute; bottom: 0; left: 0; width: 100%; background-color: var(--color-dark); color: var(--color-offWhite); text-align: center; padding-top: 4px; padding-bottom: 8px;">
            ${dateStr}
          </div>
        `
          } else {
            toolTip.innerHTML = `
          <div>
            <p style="font-size: 10px; color: ${themeColors?.primary}; font-weight: bold;">Mom. BTC: <br/>  $${signalCumReturns.toLocaleString('US')}</p>
            <p style="font-size: 10px; color: ${themeColors?.offWhite}; font-weight: bold;">BTC: <br/>  ${coin == '1000PEPE' || coin == 'DOGE' ? `$${assetCumReturns.toLocaleString('US')}` : `$${(assetCumReturns * 100).toFixed(0)}k`}</p>
          </div>
          <div style="position: absolute; bottom: 0; left: 0; width: 100%; background-color: var(--color-dark); color: var(--color-offWhite); text-align: center; padding-top: 4px; padding-bottom: 8px;">
            ${dateStr}
          </div>
        `
          }
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
      lineSeries1.createPriceLine({ ...zeroLine, color: hexToRGBA(themeColors.offWhite, 0.25) })
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
    signalCumReturns,
    assetCumReturns,
    coin,
    isSmallDevice,
    closePrice,
    signalPrice,
    window,
    studyCase,
    setStudyCase,
  ])

  return (
    <div className="relative">
      <div className="absolute -top-[4vh] right-[2vw] md:left-[6vw] md:top-0 md:w-full">
        <div className="flex w-fit items-center justify-end space-x-2 md:justify-start">
          <div className="h-1 w-[2vw] bg-primary"></div>
          <p className="text-xs text-primary md:text-sm">{strategy + ' ' + coin}</p>
        </div>
        {/* <div className="flex items-center justify-end space-x-2 md:justify-start">
          <div className="h-1 w-[2vw] bg-robin"></div>
          <span className="text-xs md:text-sm text-robin">{strategy + ' ' + coin} Simulated Price</span>
        </div> */}
        <div className="flex items-center justify-end space-x-2 md:justify-start">
          <div className="h-1 w-[2vw] bg-offWhite"></div>
          <span className="text-xs md:text-sm">{coin} Raw Price</span>
        </div>
      </div>
      <div
        ref={chartContainerRef}
        style={{ width: '100%', height: '100%', position: 'relative', marginTop: isSmallDevice ? '40px' : '20px' }}
      />
    </div>
  )
}

export default Momentum
