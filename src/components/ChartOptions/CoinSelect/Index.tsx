import React, { useContext } from 'react'

import { CoinContext } from '@/components/AppProviders'

const Index = ({ coins }: { coins: string[] }) => {
  const { coin, setCoin } = useContext(CoinContext)

  return (
    <select
      className="px-10 py-2 h-fit w-fit rounded-2xl text-md border border-white bg-smoke text-white text-left"
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

export default Index
