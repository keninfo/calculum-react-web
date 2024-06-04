import React, { useContext } from 'react'

import { CoinContext } from '@/components/AppProviders'

const CoinSelect = ({ coins }: { coins: string[] }) => {
  const { coin, setCoin } = useContext(CoinContext)

  return (
    <select
      className="px-10 py-0.5 h-fit w-fit text-md border  bg-smoke text-white text-left"
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
