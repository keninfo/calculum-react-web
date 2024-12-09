import React, { useEffect, useState } from 'react'

import { useOptionsStore } from '@/store/useOptionsStore'

const options = [
  ['1W', 7],
  ['1M', 30],
  ['3M', 90],
  ['6M', 180],
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
          className={`${selected === selection ? 'border-b-2 border-[#09d3ac] text-[#09d3ac]' : 'text-offWhite'} h-5 cursor-pointer px-1 pb-2`}
        >
          {string}
        </p>
      </button>
    </li>
  )
}

const ChartOptions = () => {
  const { window, setWindow, studyCase, setStudyCase } = useOptionsStore()
  const [selected, setSelected] = useState<number>(0)

  useEffect(() => {
    const windowMap = Object.fromEntries(options.map(([, days], index) => [days, index + 2]))

    switch (studyCase) {
      case 1:
        setSelected(0)
        break
      case 2:
        setSelected(1)
        break
      default:
        setSelected(windowMap[window] ?? -1)
    }
  }, [studyCase, window])

  const handleWindowChange = (days: number) => {
    setWindow(days)
    setStudyCase(0)
  }

  return (
    <ul className="flex items-center justify-center space-x-3 p-5 text-xs">
      <li onClick={() => setStudyCase(1)} className="cursor-pointer">
        <p
          className={`${selected === 0 ? 'border-b-2 border-[#09d3ac] text-[#09d3ac]' : 'text-offWhite'} h-5 cursor-pointer px-1 pb-2`}
        >
          Bull
        </p>
      </li>
      <li onClick={() => setStudyCase(2)} className="cursor-pointer">
        <p
          className={`${selected === 1 ? 'border-b-2 border-[#09d3ac] text-[#09d3ac]' : 'text-offWhite'} h-5 cursor-pointer px-1 pb-2`}
        >
          Bear
        </p>
      </li>
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
