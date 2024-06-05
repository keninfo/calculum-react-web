import React, { useEffect, useState } from 'react'

import CoinSelect from './CoinSelect'
import DatePicker from './DatePicker'
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
  dates: number
}

const ChartOptions: React.FC<ChartOptionsProps> = ({ onSubmit, coins }) => {
  const [volatility, setVolatility] = useState<number>(0.2)
  const [days, setDays] = useState<number>(14)
  const [dates, setDates] = useState<number>(365)

  useEffect(() => {
    const debounceSubmit = setTimeout(() => {
      const data = {
        volatility,
        days,
        dates,
      }
      onSubmit(data as dataType)
    }, 500)

    return () => clearTimeout(debounceSubmit)
  }, [days, onSubmit, volatility, dates])

  return (
    <div className="w-full flex justify-end items-center space-x-[2vw] pr-[2vw]">
      <div className="block space-y-[1vh]">
        <p className="opacity-30 text-right">Asset:</p>
        <CoinSelect coins={coins} />
      </div>
      <div className="block space-y-[1vh]">
        <p className="opacity-30 text-right">Window:</p>
        <DatePicker setDates={setDates} />
      </div>

      <div className="block space-y-[1vh]">
        <p className="opacity-30 text-right">Rolling Window:</p>
        <SetDays days={days} setDays={setDays} />
      </div>

      <div className="block space-y-[1vh]">
        <p className="opacity-30 text-right">Volatility:</p>
        <SetVolatility setVolatility={setVolatility} />
      </div>
    </div>
  )
}

export default ChartOptions
