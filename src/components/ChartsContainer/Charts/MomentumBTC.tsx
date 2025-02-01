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

const MomentumBTC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<IChartApi | undefined>()
  const initialVisibleRange = useRef<{ from: Time; to: Time } | undefined>(undefined)
  const { coin } = useStrategyStore()
  const { pro } = useProStore()
  const { studyCase, window, setStudyCase } = useOptionsStore()

  const [closePrice, setClosePrice] = useState<string[]>([])
  const [signalReturn, setSignalReturn] = useState<number[]>([])

  const [calculatedPrice, setCalculatedPrice] = useState<number[]>([])
  const [calculatedMom, setCalculatedMom] = useState<number[]>([])

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
        calculated_price: +d[`calculated_price`]!,
        calculated_mom: +d[`calculated_mom`]!,
      }))

      const dates = staticData.map((d) => new Date(d.date))
      const closePriceData = staticData.map((d) => d.closePrice)
      const signalReturnsData = staticData.map((d) => d.signal_return)
      const calculatedPriceData = staticData.map((d) => d.calculated_price)
      const calculatedMomData = staticData.map((d) => d.calculated_mom)

      setDates(dates)
      setClosePrice(closePriceData)
      setSignalReturn(signalReturnsData)
      setCalculatedPrice(calculatedPriceData)
      setCalculatedMom(calculatedMomData)
    } catch (error) {
      console.error('Error fetching signalCumReturns data:', error)
    }
  }

  useEffect(() => {
    fetchMomentum()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coin])

  useEffect(() => {
    if (!chartContainerRef.current || !themeColors || dates.length === 0 || signalReturn.length === 0) return

    if (chartInstance.current) {
      chartInstance.current.remove()
    }

    chartInstance.current = createChart(chartContainerRef.current, {
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

    const lineSeries1 = chartInstance.current?.addLineSeries({
      color: themeColors.offWhite,
      priceScaleId: 'left',
      priceFormat: {
        type: 'custom',
        formatter: (price: number) => {
          return coin == 'PEPE' || coin == 'DOGE' ? `$${price.toFixed(3)}` : `$${(price * 100).toFixed(2)}k`
        },
      },
    })

    const chartDataPrice1: PriceChartData[] = closePrice.reduce((acc, data, index) => {
      if (calculatedMom[index] === 0) return acc

      acc.push({
        time: (dates[index].getTime() / 1000) as UTCTimestamp,
        value: coin === 'PEPE' || coin === 'DOGE' ? Number(data) : Number(data) / 100000,
      })

      return acc
    }, [] as PriceChartData[])

    lineSeries1?.setData(chartDataPrice1)

    const chartDataPrice3: PriceChartData[] = calculatedMom.reduce((acc, data, index) => {
      if (data === 0) return acc

      acc.push({
        time: (dates[index].getTime() / 1000) as UTCTimestamp,
        value: coin === 'PEPE' || coin === 'DOGE' ? Number(data) : Number(data) / 100000,
      })

      return acc
    }, [] as PriceChartData[])

    const lineSeries3 = chartInstance.current?.addLineSeries({
      color: themeColors.robin,
      priceScaleId: 'right',
      priceFormat: {
        type: 'custom',
        formatter: (price: number) => {
          return `$${price.toLocaleString('US')}`
        },
      },
    })

    lineSeries3?.setData(chartDataPrice3)

    chartInstance.current?.priceScale('left').applyOptions({
      scaleMargins: { top: 0.45, bottom: 0.1 }, // Adjust as needed
      mode: 0, // Regular price scale
    })

    chartInstance.current?.priceScale('right').applyOptions({
      scaleMargins: { top: 0.2, bottom: 0.1 }, // Match left scale's visual margin
      mode: 0, // Regular price scale
    })

    const visibleRange = {
      from: (dates[0].getTime() / 1000) as UTCTimestamp,
      to: (dates[dates.length - 1].getTime() / 1000) as UTCTimestamp,
    }

    initialVisibleRange.current = visibleRange
    chartInstance.current?.timeScale().setVisibleRange(visibleRange)

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
        const data1 = lineSeries1
          ? (param.seriesData.get(lineSeries1) as { value?: number; close?: number })
          : undefined
        const assetCumReturns = data1?.value !== undefined ? data1.value : data1?.close
        const data3 = lineSeries3
          ? (param.seriesData.get(lineSeries3) as { value?: number; close?: number })
          : undefined
        const momActual = data3?.value !== undefined ? data3.value : data3?.close

        if (assetCumReturns !== undefined && momActual !== undefined) {
          toolTip.innerHTML = `
            <div>
              <p style="font-size: 10px; color: ${themeColors?.robin}; font-weight: bold;">Momentum: <br/> ${coin == 'PEPE' || coin == 'DOGE' ? `$${momActual.toLocaleString('US')}` : `$${momActual.toLocaleString('US')}`}</p>
              <p style="font-size: 10px; color: ${themeColors?.offWhite}; font-weight: bold;">BTC: <br/> ${coin == 'PEPE' || coin == 'DOGE' ? `$${assetCumReturns.toLocaleString('US')}` : `$${(assetCumReturns * 100).toFixed(0)}k`}</p>
            </div>
            <div style="position: absolute; bottom: 0; left: 0; width: 100%; background-color: var(--color-dark); color: var(--color-offWhite); text-align: center; padding-top: 4px; padding-bottom: 8px;">
              ${dateStr}
            </div>
          `
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
    coin,
    isSmallDevice,
    closePrice,
    window,
    studyCase,
    setStudyCase,
    signalReturn,
    calculatedMom,
    calculatedPrice,
  ])

  return (
    <div className="relative !pl-[1vw] !pr-[3vw]">
      <div
        ref={chartContainerRef}
        style={{ width: '100%', height: '100%', position: 'relative', marginTop: isSmallDevice ? '40px' : '20px' }}
      />
    </div>
  )
}

export default MomentumBTC
