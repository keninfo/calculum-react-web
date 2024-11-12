import { useMediaQuery } from '@uidotdev/usehooks'

import { useEffect, useRef, useState } from 'react'

import { useProStore } from '@/store/useProStore'
import { classicTheme, proTheme } from '@/styles/colors'
import { hexToRGBA } from '@/utils/formatters'

import { lineChartConfig, zeroLine } from '../ChartsContainer/chartConfig'

import * as d3 from 'd3'
import type { IChartApi, Time, UTCTimestamp } from 'lightweight-charts'
import { createChart, ColorType } from 'lightweight-charts'

interface ChartData {
  date: string
  asset_cum_return: number
  signal_cum_return: number
}

interface PriceChartData {
  time: Time
  value: number
}

interface LightweightChartProps {
  csvPath: string
}

interface ThemeColorsType {
  dark: string
  eerie: string
  primary: string
  offWhite: string
  grey: string
}

const LightweightChart: React.FC<LightweightChartProps> = ({ csvPath }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<IChartApi | undefined>()
  const [themeColors, setThemeColors] = useState<ThemeColorsType | null>(null)
  const initialVisibleRange = useRef<{ from: Time; to: Time } | undefined>(undefined)
  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)')

  const { pro } = useProStore()

  const [dates, setDates] = useState<Date[]>([])
  const [assetReturns, setAssetReturns] = useState<number[]>([])
  const [signalReturns, setSignalReturns] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  useEffect(() => {
    // Load and parse CSV data
    const fetchData = async () => {
      try {
        const csvData = await d3.csv<ChartData>(csvPath, d3.autoType)

        // Extract each column's data
        setDates(csvData.map((d) => new Date(d.date)))
        setAssetReturns(csvData.map((d) => d.asset_cum_return))
        setSignalReturns(csvData.map((d) => d.signal_cum_return))

        setLoading(false)
      } catch (e) {
        setError('Failed to load CSV data')
        setLoading(false)
      }
    }

    fetchData()
  }, [csvPath])

  useEffect(() => {
    if (
      !chartContainerRef.current ||
      !themeColors ||
      dates.length === 0 ||
      assetReturns.length === 0 ||
      signalReturns.length === 0
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
        visible: false,
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
      timeScale: {
        ...lineChartConfig.timeScale,
        uniformDistribution: true,
        visible: false,
      },
    })

    const lineSeries1 = chartInstance.current?.addLineSeries({
      color: themeColors.offWhite,
      priceScaleId: 'left',
    })

    const chartDataPrice1: PriceChartData[] = assetReturns.map((data, index) => ({
      time: (dates[index].getTime() / 1000) as UTCTimestamp,
      value: data,
    }))

    lineSeries1?.setData(chartDataPrice1)

    const lineSeries2 = chartInstance.current?.addLineSeries({
      color: themeColors.primary,
      priceScaleId: 'left',
    })

    const chartDataPrice2: PriceChartData[] = signalReturns.map((data, index) => ({
      time: (dates[index].getTime() / 1000) as UTCTimestamp,
      value: data,
    }))

    lineSeries2?.setData(chartDataPrice2)

    const visibleRange = {
      from: (dates[0].getTime() / 1000) as UTCTimestamp,
      to: (dates[dates.length - 1].getTime() / 1000) as UTCTimestamp,
    }

    initialVisibleRange.current = visibleRange
    chartInstance.current?.timeScale().setVisibleRange(visibleRange)

    chartInstance.current?.timeScale().resetTimeScale()
    chartInstance.current?.timeScale().fitContent()

    if (lineSeries1) {
      lineSeries1.createPriceLine({ ...zeroLine, color: hexToRGBA(themeColors.offWhite, 0.25) })
    }

    return () => {
      chartInstance.current?.remove()
      chartInstance.current = undefined
    }
  }, [dates, themeColors, isSmallDevice, assetReturns, signalReturns])

  const firstDate = dates.length > 0 ? dates[0].toLocaleDateString('en-US') : 'N/A'
  const lastDate = dates.length > 0 ? dates[dates.length - 1].toLocaleDateString('en-US') : 'N/A'

  return (
    <div className="relative">
      {loading ? (
        <p className="mt-2 text-center">Loading...</p>
      ) : error ? (
        <p className="mt-2 text-center"> {error}</p>
      ) : (
        <>
          <div ref={chartContainerRef} style={{ width: '100%', height: '100%', position: 'relative' }} />
          <div className="mt-4 flex items-center justify-between text-payne">
            <p>{firstDate}</p> <p>{lastDate}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default LightweightChart
