import React, { useContext } from 'react'

import { OptionsContext } from '@/components/AppProviders'
import Select from '@/components/common/Select'

const strategies = ['Smoothcoin', 'Momentum', 'Alpha One']

const StrategySelect = () => {
  const { strategy, setStrategy } = useContext(OptionsContext)

  return <Select handleChange={(e) => setStrategy(e.target.value)} value={strategy} options={strategies} />
}

export default StrategySelect
