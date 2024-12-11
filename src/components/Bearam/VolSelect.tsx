import React from 'react'

import Select from '@/components/common/Select'
import { useOptionsStore } from '@/store/useOptionsStore'

const opts = [0.2, 0.6]

const VolSelect = () => {
  const { volatility, setVolatility } = useOptionsStore()

  return (
    <Select
      handleChange={(e) => setVolatility(Number(e.target.value))}
      value={volatility}
      options={opts}
      className="!text-[#09d3ac]"
    />
  )
}

export default VolSelect
