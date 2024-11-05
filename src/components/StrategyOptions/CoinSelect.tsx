import React from 'react'

import Select from '@/components/common/Select'
import { useStrategyStore } from '@/store/useStrategyStore'

const coins = ['BTC']

const CoinSelect = () => {
  const { coin, setCoin } = useStrategyStore()

  return <Select handleChange={(e) => setCoin(e.target.value)} value={coin} options={coins} />
}

export default CoinSelect
