import React, { useContext } from 'react'

import { OptionsContext } from '@/contexts/OptionsContext'

const target_volatilities = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6]

const SetVolatility = () => {
  const { volatility, setVolatility } = useContext(OptionsContext)
  return (
    <select
      className="h-fit w-fit border border-white bg-smoke px-10 py-0.5 text-left text-sm text-white"
      id="cryptoCoin"
      onChange={(e) => setVolatility(parseFloat(e.target.value))}
      value={volatility}
    >
      {target_volatilities.map((target, index) => (
        <option key={index} value={target}>
          {target}
        </option>
      ))}
    </select>
  )
}

export default SetVolatility
