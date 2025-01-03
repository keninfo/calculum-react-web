import React from 'react'

import Image from 'next/image'

const TVAttribution = () => {
  return (
    <div className="flex w-full justify-between px-2 pt-5">
      <div>
        <p className="text-left text-xs text-grey">Powered by</p>
        <a href="https://www.tradingview.com/" target="_blank" className="h-fit w-fit">
          <Image
            src={'TV-1.svg'}
            alt="logo for trading view"
            width={500}
            height={500}
            className="h-6 w-full fill-white"
          />
        </a>
      </div>
      <p className="w-1/2 text-right text-[10px] text-grey">
        {`Advanced Charting is displayed using TradingView's technology, a platform which offers tools and data for
        comprehensive market research: here,`}
        <a href="https://www.tradingview.com/economic-calendar/" target="_blank" className="text-robin">
          you can track the latest events in the Economic calendar
        </a>
        {`, watch live
        prices, and much more.`}
      </p>
    </div>
  )
}

export default TVAttribution
