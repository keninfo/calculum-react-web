import React, { useContext } from 'react'

import { OptionsContext } from '@/contexts/OptionsContext'

const SetRollingWindows = () => {
  const { rollingWindow, setRollingWindow } = useContext(OptionsContext)

  const numberValidation = (e: string) => {
    if (e === '') {
      setRollingWindow(0) // or any other default value you prefer
      return
    }
    try {
      if (parseInt(e) > 365) {
        throw new Error('Not a valid number')
      }
    } catch (error) {
      return
    }

    if (e.match(/^[0-9]*$/)) {
      setRollingWindow(parseInt(e))
    }
  }

  return (
    <input
      className="h-fit border border-white bg-smoke px-1 py-0.5 text-center text-sm text-white"
      type="text"
      id="days"
      value={rollingWindow}
      onChange={(e) => numberValidation(e.target.value)}
    ></input>
  )
}

export default SetRollingWindows
