import React, { useState } from 'react'

import CoinSelect from './CoinSelect'
import DatePicker from './DatePicker/Index'
import SetDays from './SetDays/Index'

const Index = ({ coins }: { coins: string[] }) => {
  const [start, setStart] = useState<Date>(new Date('2020-01-01'))
  const [end, setEnd] = useState<Date>(new Date())
  const [days, setDays] = useState<number>(2)

  return (
    <div className="absolute top-10 left-0 w-fit h-[10vh] flex justify-between items-center space-x-16">
      <div className="flex justify-start space-x-4">
        <CoinSelect coins={coins} />
        {/* <IntervalSelect setInterval={setInterval} /> */}
        <SetDays days={days} setDays={setDays} />
      </div>
      <div>
        <DatePicker startDate={start} endDate={end} setStartDate={setStart} setEndDate={setEnd} />
      </div>
    </div>
  )
}

export default Index
