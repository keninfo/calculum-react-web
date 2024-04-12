import React, { useEffect, useRef } from 'react'

import { useTheme } from '@mui/material'

import { mockedPriceData } from './mockedPriceData'
import css from './styles.module.css'

import { createChart, ColorType } from 'lightweight-charts'

const ChartContainer = () => {
  const { palette } = useTheme()
  const chartContainerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return
    const handleResize = () => {
      if (!chartContainerRef.current) return
      chart.applyOptions({ width: chartContainerRef.current.clientWidth })
    }

    const chart = createChart(chartContainerRef.current, {
      layout: {
        textColor: palette.text.primary,
        background: { type: ColorType.Solid, color: palette.background.main },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    })

    chart.timeScale().fitContent()

    const newSeries = chart.addCandlestickSeries({
      upColor: palette.success.main,
      downColor: palette.error.main,
      borderVisible: false,
      wickUpColor: palette.success.main,
      wickDownColor: palette.error.main,
    })
    newSeries.setData(mockedPriceData)

    window.addEventListener('resize', handleResize)

    return () => {
      chart.remove()
      window.removeEventListener('resize', handleResize)
    }
  }, [palette.background.main, palette.error.main, palette.success.main, palette.text.primary])

  return <div className={css.chartContainer} ref={chartContainerRef as React.RefObject<HTMLDivElement>} />
}

export default ChartContainer
