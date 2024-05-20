import React, { useEffect, useState } from 'react'

import DatePicker from './DatePicker/Index'
import SetDays from './SetDays/Index'

const Index = ({ coins }: { coins: string[] }) => {
  const [start, setStart] = useState<Date>(new Date('2020-01-01'))
  const [end, setEnd] = useState<Date>(new Date())
  const [volatility, setVolatility] = useState<number>(0.1)
  const [days, setDays] = useState<number>(2)

  useEffect(() => {
    // Define the debouncing function
    const debounceSubmit = setTimeout(() => {
      const data = {
        start,
        end,
        volatility,
        days,
      }
      onSubmit(data as dataType)
    }, 500) // Adjust debounce time as needed

    // Cleanup function to clear the timeout when any input changes
    return () => clearTimeout(debounceSubmit)
  }, [days, end, onSubmit, start, volatility])

  return (
    <div className="w-100 h-[10vh] flex justify-end items-end space-x-10">
      <SetDays days={days} setDays={setDays} />
      <SetVolatility setVolatility={setVolatility} />
      <DatePicker startDate={start} endDate={end} setStartDate={setStart} setEndDate={setEnd} />
    </div>
  )
}

export default ChartOptions
