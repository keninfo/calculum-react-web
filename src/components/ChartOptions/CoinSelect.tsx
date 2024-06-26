import React, { useContext } from 'react'

import { OptionsContext } from '@/components/AppProviders'

const coins = ['BTC - High Vol', 'BTC - Controlled Vol', 'ETH', 'PEPE']

const CoinSelect = () => {
  const { coin, setCoin } = useContext(OptionsContext)

  return (
    <select
      className="px-[2vw] py-0.5 h-fit w-full text-sm border border-white  bg-smoke text-white text-left | md:w-fit"
      id="cryptoCoin"
      onChange={(e) => setCoin(e.target.value)}
      value={coin}
    >
      {coins.map((coin, index) => (
        <option key={index} value={coin}>
          {coin}
        </option>
      ))}
    </select>
  )
}

export default CoinSelect
