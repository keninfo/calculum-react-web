import React, { useContext } from 'react'

import { OptionsContext } from '../AppProviders'

const ShowCandle = () => {
  const { showCandle, setShowCandle } = useContext(OptionsContext)

  return (
    <button
      onClick={() => setShowCandle(!showCandle)}
      className="px-10 py-0.5 h-fit w-full text-sm  bg-smoke text-white text-center rounded-none hover:text-carmesi hover:scale-105"
    >
      {showCandle ? 'Volatility' : 'Candlestick'}
    </button>
  )
}

export default ShowCandle
