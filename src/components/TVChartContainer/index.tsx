import { useEffect, useRef } from 'react'

import { widget } from '@/public/charting_library'
import type { ChartingLibraryWidgetOptions, LanguageCode, ResolutionString } from '@/public/charting_library'
import { proTheme } from '@/styles/colors'

export const TVChartContainer = (props: Partial<ChartingLibraryWidgetOptions>) => {
  const chartContainerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>

  useEffect(() => {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: props.symbol,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed('https://demo_feed.tradingview.com', undefined, {
        maxResponseLength: 1000,
        expectedOrder: 'latestFirst',
      }),
      interval: props.interval as ResolutionString,
      container: chartContainerRef.current,
      library_path: props.library_path,
      locale: props.locale as LanguageCode,
      disabled_features: ['use_localstorage_for_settings', 'header_resolutions'],
      enabled_features: [],
      charts_storage_url: props.charts_storage_url,
      charts_storage_api_version: props.charts_storage_api_version,
      client_id: props.client_id,
      user_id: props.user_id,
      fullscreen: props.fullscreen,
      autosize: props.autosize,
      overrides: {
        'paneProperties.background': proTheme.dark, // Custom background color
        'paneProperties.vertGridProperties.color': proTheme.payne, // Vertical grid color
        'paneProperties.horzGridProperties.color': proTheme.payne, // Horizontal grid color
        'scalesProperties.textColor': proTheme.offWhite, // Text color for scales
      },

      // debug: true,
    }

    const tvWidget = new widget(widgetOptions)

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton()
        button.setAttribute('title', 'Click to show a notification popup')
        button.classList.add('apply-common-tooltip')
        button.addEventListener('click', () =>
          tvWidget.showNoticeDialog({
            title: 'Notification',
            body: 'TradingView Charting Library API works correctly',
            callback: () => {
              console.log('Noticed!')
            },
          }),
        )
        button.innerHTML = 'Check API'
      })

      tvWidget.setCSSCustomProperty('--tv-color-pane-background', proTheme.dark)
      tvWidget.setCSSCustomProperty('--tv-color-platform-background', proTheme.dark)

      tvWidget.setCSSCustomProperty('--tv-color-toolbar-button-text', proTheme.offWhite)
      tvWidget.setCSSCustomProperty('--tv-color-toolbar-button-text-hover', proTheme.robin)
    })

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
