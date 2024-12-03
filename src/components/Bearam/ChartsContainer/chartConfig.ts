import { proTheme } from '@/styles/colors'

import type { DeepPartial, LineWidth } from 'lightweight-charts'

export const lineChartConfig = {
  layout: {
    attributionLogo: false,
  },
  grid: {
    vertLines: {
      color: proTheme.payne,
      visible: false,
    },
    horzLines: {
      visible: false,
    },
  },
  rightPriceScale: {
    visible: false,
    borderVisible: false,
  },
  leftPriceScale: {
    mode: 1,
    visible: true,
    borderVisible: false,
  },
  timeScale: {
    uniformDistribution: false,
    visible: true,
    borderVisible: false,
    fixRightEdge: true,
    fixLeftEdge: true, // set back to true
    tickMarkFormatter: (time: string | number | Date, locale: Intl.LocalesArgument) => {
      // Check if `time` is a number (e.g., a timestamp)
      if (typeof time === 'number') {
        // If `time` is less than a certain threshold, assume it's in seconds, not milliseconds
        if (time < 1e12) time *= 1000 // Convert seconds to milliseconds
      }

      const date = new Date(time)
      return date.toLocaleDateString(locale, { month: 'numeric', day: 'numeric', year: '2-digit' })
    },
  },
  crosshair: {
    horzLine: {
      visible: false,
      labelVisible: false,
    },
    vertLine: {
      visible: true,
      style: 0,
      width: 2 as DeepPartial<LineWidth>,
      color: '#111111',
      labelVisible: false,
    },
  },
  localization: {
    dateFormat: "dd MMMM 'yy",
    priceFormatter: (price: number) => {
      return (price / 100).toFixed(2) // Append a string (e.g., currency symbol) to each value
    },
  },
  handleScroll: {
    mouseWheel: false,
    horzTouchDrag: false,
    vertTouchDrag: false,
  },
  handleScale: {
    mouseWheel: false,
  },
}

export const toolTipWidth = 96

export const tooltipConfig = {
  width: `${toolTipWidth}px`,
  position: 'absolute',
  display: 'none',
  padding: '8px',
  boxSizing: 'border-box',
  fontSize: '12px',
  textAlign: 'left',
  zIndex: '10',
  top: '12px',
  left: '12px',
  pointerEvents: 'none',
  fontFamily: 'Inter, Roboto, Ubuntu, sans-serif',
  color: 'offWhite',
}

export const zeroLine = {
  price: 100,
  color: proTheme.offWhite,
  lineWidth: 2 as LineWidth,
  lineStyle: 0,
  axisLabelVisible: false,
  priceScaleId: 'left',
}
