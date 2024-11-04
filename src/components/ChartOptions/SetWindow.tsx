import React, { useContext } from 'react'

import Select from '@/components/common/Select'
import { OptionsContext } from '@/contexts/OptionsContext'

const dates = [365, 90, 60, 30]

// const start = 365
// const end = 14

// const dates = Array.from({ length: start - end + 1 }, (_, i) => start - i)

const SetWindow = () => {
  const { window, setWindow } = useContext(OptionsContext)

  return <Select handleChange={(e) => setWindow(parseFloat(e.target.value))} value={window} options={dates} />
}

export default SetWindow
