import React from 'react'

import Select from '@/components/common/Select'
import { useOptionsStore } from '@/store/useOptionsStore'

const coins = ['BTC']

const CoinSelect = () => {
  const { coin, setCoin } = useOptionsStore()

  return <Select handleChange={(e) => setCoin(e.target.value)} value={coin} options={coins} />
}

export default CoinSelect
