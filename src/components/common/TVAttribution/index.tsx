import React from 'react'

import Image from 'next/image'

const TVAttribution = () => {
  return (
    <div className="w-full justify-between px-2 md:flex md:pt-5">
      <div>
        <p className="text-center text-xs text-grey md:text-left">Powered by</p>
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
      <p className="text-center text-[10px] text-grey md:w-1/2 md:text-right">
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
