import React, { useContext } from 'react'

import Select from '@/components/common/Select'
import { OptionsContext } from '@/contexts/OptionsContext'

const strategies = ['Smoothcoin', 'Momentum']

const StrategySelect = () => {
  const { strategy, setStrategy } = useContext(OptionsContext)

  return <Select handleChange={(e) => setStrategy(e.target.value)} value={strategy} options={strategies} />
}

export default StrategySelect
