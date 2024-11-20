import { useMediaQuery } from '@uidotdev/usehooks'

import React, { useEffect, useRef, useState } from 'react'

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
}

const Momentum = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<IChartApi | undefined>()
  const initialVisibleRange = useRef<{ from: Time; to: Time } | undefined>(undefined)
  const { coin, strategy } = useStrategyStore()
  const { pro } = useProStore()

  // const [assetReturns, setAssetReturns] = useState<number[]>([])
  // const [signalReturns, setSignalReturns] = useState<number[]>([])
  const [assetCumReturns, setAssetCumReturns] = useState<number[]>([])
  const [signalCumReturns, setSignalCumReturns] = useState<number[]>([])

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
          }
        : {
            dark: classicTheme.dark,
            eerie: classicTheme.eerie,
            primary: classicTheme.primary,
            offWhite: classicTheme.offWhite,
            grey: classicTheme.grey,
          },
    )
  }, [pro])

  const fetchMomentum = async () => {
    const staticDataSrc = '/momentum/btcUpdated.csv'

    try {
      const staticData = await d3.csv(staticDataSrc, (d) => ({
        date: d.date!,
        asset_return: +d.asset_return!,
        signal_return: +d.signal_return!,
        asset_cum_return: +d.asset_cum_return!,
        signal_cum_return: +d.signal_cum_return!,
      }))

      const dates = staticData.map((d) => new Date(d.date))
      // const assetReturnsData = staticData.map((d) => d.asset_return)
      // const signalReturnsData = staticData.map((d) => d.signal_return)
      const assetCumReturnsData = staticData.map((d) => d.asset_cum_return)
      const signalCumReturnsData = staticData.map((d) => d.signal_cum_return)

      setDates(dates)
      // setAssetReturns(assetReturnsData)
      // setSignalReturns(signalReturnsData)
      setAssetCumReturns(assetCumReturnsData)
      setSignalCumReturns(signalCumReturnsData)
    } catch (error) {
      console.error('Error fetching signalCumReturns data:', error)
    }
  }

  useEffect(() => {
    fetchMomentum()
  }, [])

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
        mode: 0,
      },
      crosshair: {
        ...lineChartConfig.crosshair,
        vertLine: { ...lineChartConfig.crosshair.vertLine, color: hexToRGBA(themeColors.offWhite, 0.1) },
      },
      localization: {
        dateFormat: "dd MMMM 'yy",
        priceFormatter: (price: number) => {
          return price.toLocaleString('US') // Append a string (e.g., currency symbol) to each value
        },
      },
    })

    const lineSeries1 = chartInstance.current?.addLineSeries({
      color: themeColors.offWhite,
      priceScaleId: 'left',
    })

    const assetCumReturnsSliced = assetCumReturns.slice(0, assetCumReturns.length - 1)

    const datesSliced = dates.slice(0, assetCumReturns.length - 1)

    const chartDataPrice1: PriceChartData[] = assetCumReturnsSliced.map((data, index) => ({
      time: (datesSliced[index].getTime() / 1000) as UTCTimestamp,
      value: data,
    }))

    lineSeries1?.setData(chartDataPrice1)

    const lineSeries2 = chartInstance.current?.addLineSeries({
      color: themeColors.primary,
      priceScaleId: 'left',
    })

    const signalCumReturnsSliced = signalCumReturns.slice(0, signalCumReturns.length - 1)

    const chartDataPrice2: PriceChartData[] = signalCumReturnsSliced.map((data, index) => ({
      time: (datesSliced[index].getTime() / 1000) as UTCTimestamp,
      value: data,
    }))

    lineSeries2?.setData(chartDataPrice2)

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
            <p style="font-size: 10px; color: ${themeColors?.offWhite}; font-weight: bold;">assetCumReturns Raw: ${assetCumReturns}</p>
            <p style="font-size: 10px; color: ${themeColors?.primary}; font-weight: bold;">signalCumReturns: ${signalCumReturns}</p>
          </div>
          <div style="position: absolute; bottom: 0; left: 0; width: 100%; background-color: var(--color-dark); color: var(--color-offWhite); text-align: center; padding-top: 4px; padding-bottom: 8px;">
            ${dateStr}
          </div>
        `
          } else {
            toolTip.innerHTML = `
          <div>
            <p style="font-size: 10px; color: ${themeColors?.primary}; font-weight: bold;">signalCumReturns: ${signalCumReturns.toLocaleString('US')}</p>
            <p style="font-size: 10px; color: ${themeColors?.offWhite}; font-weight: bold;">assetCumReturns Raw: ${assetCumReturns.toLocaleString('US')}</p>
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
  }, [dates, themeColors, signalCumReturns, assetCumReturns, coin, isSmallDevice])

  return (
    <div className="relative">
      <div className="absolute -top-[4vh] right-[2vw] md:left-[8vw] md:top-0 md:w-full">
        <div className="flex items-center justify-end space-x-2 md:justify-start">
          <div className="h-1 w-[2vw] bg-offWhite"></div>
          <span className="text-xs md:text-sm">{coin} Raw Price</span>
        </div>
        <div className="flex w-fit items-center justify-end space-x-2 md:justify-start">
          <div className="h-1 w-[2vw] bg-primary"></div>
          <p className="text-xs text-primary md:text-sm">{strategy + ' ' + coin}</p>
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
