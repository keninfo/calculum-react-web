import React, { useEffect, useState } from 'react'

import SetDays from './SetDays'
import SetVolatility from './SetVolatility'

interface ChartOptionsProps {
  onSubmit: (dataType: dataType) => void
}

interface dataType {
  start: Date
  end: Date
  volatility: number
  days: number
}

const ChartOptions: React.FC<ChartOptionsProps> = ({ onSubmit }) => {
  const [volatility, setVolatility] = useState<number>(0.1)
  const [days, setDays] = useState<number>(2)

  useEffect(() => {
    // Define the debouncing function
    const debounceSubmit = setTimeout(() => {
      const data = {
        volatility,
        days,
      }
      onSubmit(data as dataType)
    }, 500) // Adjust debounce time as needed

    // Cleanup function to clear the timeout when any input changes
    return () => clearTimeout(debounceSubmit)
  }, [days, onSubmit, volatility])

  return (
    <div className="w-full h-[10vh] flex justify-between align-middle items-center">
      <p className="w-fit">365 days</p>
      <div className="flex justify-end items-end space-x-10">
        <SetDays days={days} setDays={setDays} />
        <SetVolatility setVolatility={setVolatility} />
      </div>
    </div>
  )
}

export default ChartOptions
