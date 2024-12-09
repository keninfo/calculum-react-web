import React from 'react'

import Select from '@/components/common/Select'
import { useStrategyStore } from '@/store/useStrategyStore'

const strategies = ['Momentum']

const StrategySelect = () => {
  const { strategy, setStrategy } = useStrategyStore()

  return (
    <Select
      handleChange={(e) => setStrategy(e.target.value)}
      value={strategy}
      options={strategies}
      className="text-lg !text-[#09d3ac]"
    />
  )
}

export default StrategySelect
