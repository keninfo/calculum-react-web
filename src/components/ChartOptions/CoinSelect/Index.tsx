import { useContext } from 'react'

import { CoinContext } from '@/components/AppProviders'

const Index = ({ coins }: { coins: string[] }) => {
  const { coin, setCoin } = useContext(CoinContext)

  return (
    <select
      className="px-10 py-4 h-fit w-fit rounded-lg text-xs border-white text-[#201F31] text-center"
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
