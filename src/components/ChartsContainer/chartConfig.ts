import type { DeepPartial, LineWidth } from 'lightweight-charts'
import { ColorType } from 'lightweight-charts'

export const lineChartConfig = {
  layout: {
    background: { type: ColorType.Solid, color: 'transparent' },
    textColor: 'white',
  },
  grid: {
    vertLines: {
      visible: false,
    },
    horzLines: {
      visible: false,
    },
  },
  rightPriceScale: {
    visible: true,
    borderVisible: false,
  },
  leftPriceScale: {
    mode: 0,
    visible: true,
    borderVisible: false,
  },
  timeScale: {
    visible: true,
    borderVisible: false,
    fixLeftEdge: true,
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
      color: 'rgba(32, 38, 46, 0.1)',
      labelVisible: false,
    },
  },
  localization: {
    dateFormat: "dd MMMM 'yy",
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
  fontFamily: '-apple-system, BlinkMacSystemFont, Montserrat, Roboto, Ubuntu, sans-serif',
  color: 'white',
}
