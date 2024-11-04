import React from 'react'

import Select from '@/components/common/Select'
import { useOptionsStore } from '@/store/useOptionsStore'

const strategies = ['Smoothcoin', 'Momentum']

const StrategySelect = () => {
  const { strategy, setStrategy } = useOptionsStore()

  return <Select handleChange={(e) => setStrategy(e.target.value)} value={strategy} options={strategies} />
}

export default StrategySelect
