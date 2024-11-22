import React from 'react'

import Select from '@/components/common/Select'
import { useStrategyStore } from '@/store/useStrategyStore'

const networks = ['Arbitrum Sepolia']

const NetworkSelect = () => {
  const { network, setNetwork } = useStrategyStore()
  return <Select value={network} options={networks} handleChange={(e) => setNetwork(e.target.value)} />
}

export default NetworkSelect
