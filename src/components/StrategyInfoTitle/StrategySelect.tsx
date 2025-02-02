import React from 'react'

import Select from '@/components/common/Select'
import { useStrategyStore } from '@/store/useStrategyStore'

const strategies = ['Smoothcoin', 'Momentum']
const coins = ['BTC', 'DOGE', 'PEPE', 'ETH']

const combinations = strategies.flatMap((strategy) => coins.map((coin) => `${strategy} ${coin}`))

const StrategyCoinSelect = () => {
  const { setStrategy, setCoin, strategy, coin } = useStrategyStore()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const parts = e.target.value.split(' ')
    const selectedStrategy = parts.slice(0, -1).join(' ')
    const selectedCoin = parts[parts.length - 1]
    setStrategy(selectedStrategy)
    setCoin(selectedCoin)
  }

  return (
    <Select
      handleChange={handleChange}
      value={`${strategy} ${coin}`}
      options={combinations}
      className="text-3xl text-primary"
    />
  )
}

export default StrategyCoinSelect
