import React, { useEffect, useState, useContext } from 'react'

import { CoinContext } from '@/components/AppProviders'

import CryptoIcon from '../common/CryptoIcon'
import CoinSelect from './CoinSelect'
import SetDays from './SetDays'
import SetVolatility from './SetVolatility'

interface ChartOptionsProps {
  onSubmit: (dataType: dataType) => void
  coins: string[]
}

interface dataType {
  start: Date
  end: Date
  volatility: number
  days: number
}

const ChartOptions: React.FC<ChartOptionsProps> = ({ onSubmit, coins }) => {
  const [volatility, setVolatility] = useState<number>(0.2)
  const [days, setDays] = useState<number>(14)
  const { coin } = useContext(CoinContext)

  useEffect(() => {
    const debounceSubmit = setTimeout(() => {
      const data = {
        volatility,
        days,
      }
      onSubmit(data as dataType)
    }, 500)

    return () => clearTimeout(debounceSubmit)
  }, [days, onSubmit, volatility])

  return (
    <div className="w-full h-[10vh] flex justify-start items-center space-x-10">
      <div className="flex justify-start items-center">
        <CryptoIcon coin={coin} className="size-[2vw] mr-[1vw]" type="white" />
        <CoinSelect coins={coins} />
      </div>

      <p className="border px-10 py-0.5 bg-smoke">Last 365 days</p>
      <SetDays days={days} setDays={setDays} />
      <SetVolatility setVolatility={setVolatility} />
    </div>
  )
}

export default ChartOptions
