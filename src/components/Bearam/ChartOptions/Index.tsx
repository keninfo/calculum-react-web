import React, { useEffect, useState } from 'react'

import { useOptionsStore } from '@/store/useOptionsStore'

const options = [
  ['6M', 30 * 6],
  ['12M', 30 * 12],
  ['18M', 30 * 18],
  ['24M', 30 * 24],
  ['ALL', 0],
]

const DaySelectionButton = ({
  string,
  days,
  selected,
  selection,
  handleSelection,
}: {
  string: string
  days: number
  selected: number
  selection: number
  handleSelection: (arg0: number) => void
}) => {
  return (
    <li>
      <button onClick={() => handleSelection(days)}>
        <p
          className={`${selected === selection ? 'border-b-2 border-[#09d3ac] text-[#09d3ac]' : 'text-offWhite'} h-8 cursor-pointer px-1 pb-2`}
        >
          {string}
        </p>
      </button>
    </li>
  )
}

const ChartOptions = () => {
  const { window, setWindow } = useOptionsStore()
  const [selected, setSelected] = useState<number>(0)

  useEffect(() => {
    const windowMap = Object.fromEntries(options.map(([, days], index) => [days, index + 2]))
    setSelected(windowMap[window] ?? -1)
  }, [window])

  const handleWindowChange = (days: number) => {
    setWindow(days)
  }

  return (
    <ul className="text-md flex items-center justify-center space-x-3">
      {options.map((option, index) => {
        return (
          <DaySelectionButton
            key={index}
            string={option[0] as string}
            days={option[1] as number}
            selected={selected}
            selection={index + 2}
            handleSelection={handleWindowChange}
          />
        )
      })}
    </ul>
  )
}

export default ChartOptions
