import React from 'react'

import Select from '@/components/common/Select'
import { useStrategyStore } from '@/store/useStrategyStore'

const coins = ['BTC-ETH-SOL']

const CoinSelect = () => {
  const { coin, setCoin } = useStrategyStore()

  return (
    <Select handleChange={(e) => setCoin(e.target.value)} value={coin} options={coins} className="!text-[#09d3ac]" />
  )
}

export default CoinSelect
