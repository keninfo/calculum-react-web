import React, { useEffect, useState } from 'react'

import CoinSelect from './CoinSelect/Index'
import DatePicker from './DatePicker/Index'
import SetDays from './SetDays/Index'
import SetVolatility from './SetVolatility/Index'

interface Data {
  interval: string
  start: Date
  end: Date
  volatility: number
  days: number
}

const Index = ({ coins, onSubmit }: { coins: string[]; onSubmit: (data: Data) => void }) => {
  const [interval] = useState<string>('Daily')
  const [start, setStart] = useState<Date>(new Date('2020-01-01'))
  const [end, setEnd] = useState<Date>(new Date())
  const [volatility, setVolatility] = useState<number>(0.1)
  const [days, setDays] = useState<number>(2)

  useEffect(() => {
    // Define the debouncing function
    const debounceSubmit = setTimeout(() => {
      const data = {
        interval,
        start,
        end,
        volatility,
        days,
      }
      onSubmit(data)
    }, 500) // Adjust debounce time as needed

    // Cleanup function to clear the timeout when any input changes
    return () => clearTimeout(debounceSubmit)
  }, [days, end, interval, onSubmit, start, volatility])

  return (
    <div className="absolute top-10 left-0 w-fit h-[10vh] flex justify-between items-center space-x-16">
      <div className="flex justify-start space-x-4">
        <CoinSelect coins={coins} />
        {/* <IntervalSelect setInterval={setInterval} /> */}
        <SetDays days={days} setDays={setDays} />
        <SetVolatility setVolatility={setVolatility} />
      </div>
      <div>
        <DatePicker startDate={start} endDate={end} setStartDate={setStart} setEndDate={setEnd} />
      </div>
    </div>
  )
}

export default Index
