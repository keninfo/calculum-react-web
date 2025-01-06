'use client'

import { useState } from 'react'

import dynamic from 'next/dynamic'
import Script from 'next/script'

import Card from '@/components/common/Card'
import type { ChartingLibraryWidgetOptions, ResolutionString } from '@/public/charting_library/charting_library'

const defaultWidgetProps: Partial<ChartingLibraryWidgetOptions> = {
  symbol: 'AAPL',
  interval: 'D' as ResolutionString,
  library_path: '/charting_library/',
  locale: 'en',
  charts_storage_url: 'https://saveload.tradingview.com',
  charts_storage_api_version: '1.1',
  client_id: 'tradingview.com',
  user_id: 'public_user_id',
  fullscreen: false,
  autosize: true,
}

const TVChartContainer = dynamic(() => import('@/components/TVChartContainer').then((mod) => mod.TVChartContainer), {
  ssr: false,
})

export default function Home() {
  const [isScriptReady, setIsScriptReady] = useState(false)
  return (
    <>
      <Script
        src="/datafeeds/udf/dist/bundle.js"
        strategy="lazyOnload"
        onReady={() => {
          setIsScriptReady(true)
        }}
      />
      <Card className="!h-[50vh] w-[50vw]">{isScriptReady && <TVChartContainer {...defaultWidgetProps} />}</Card>
    </>
  )
}
