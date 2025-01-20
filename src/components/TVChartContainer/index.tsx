// TVChartContainer.tsx
import { useEffect, useRef } from 'react'

import { CustomUDFDatafeed } from '@/app/chart-test/CustomDatafeed'
import { widget } from '@/public/charting_library'
import type { ChartingLibraryWidgetOptions, LanguageCode, ResolutionString } from '@/public/charting_library'
import { proTheme } from '@/styles/colors'

export const TVChartContainer = (props: Partial<ChartingLibraryWidgetOptions>) => {
  const chartContainerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>

  useEffect(() => {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: props.symbol || 'moBTC', // Default symbol if not passed
      datafeed: new CustomUDFDatafeed(),
      interval: '1D' as ResolutionString,
      container: chartContainerRef.current,
      library_path: props.library_path,
      locale: props.locale as LanguageCode,
      disabled_features: [
        'use_localstorage_for_settings',
        'header_resolutions', // Remove header resolution options
        'left_toolbar', // Remove the left toolbar (draw tools)
        'header_chart_type',
      ],
      enabled_features: [],
      charts_storage_url: props.charts_storage_url,
      charts_storage_api_version: props.charts_storage_api_version,
      client_id: props.client_id,
      user_id: props.user_id,
      fullscreen: props.fullscreen,
      autosize: props.autosize,
      overrides: {
        'mainSeriesProperties.style': 2, // 2 represents the line chart style
        'paneProperties.background': proTheme.dark,
        'paneProperties.vertGridProperties.color': proTheme.payne,
        'paneProperties.horzGridProperties.color': proTheme.payne,
        'scalesProperties.textColor': proTheme.offWhite,
        'tradingProperties.background': proTheme.payne,
      },
    }

    const tvWidget = new widget(widgetOptions)

    return () => {
      tvWidget.remove()
    }
  }, [props])

  return (
    <>
      <div ref={chartContainerRef} className="h-full w-full p-5" />
    </>
  )
}
