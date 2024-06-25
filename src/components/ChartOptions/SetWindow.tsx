import React, { useContext } from 'react'

import { OptionsContext } from '@/components/AppProviders'

const dates = [365, 90, 60, 30]

const SetWindow = () => {
  const { window, setWindow } = useContext(OptionsContext)

  return (
    <select
      className="px-[2vw] py-0.5 h-fit w-full text-sm border border-white bg-smoke text-white text-left rounded-none | md:w-max"
      id="cryptoCoin"
      onChange={(e) => setWindow(parseFloat(e.target.value))}
      value={window}
    >
      {dates.map((target, index) => (
        <option key={index} value={target}>
          {target}
        </option>
      ))}
    </select>
  )
}

export default SetWindow
