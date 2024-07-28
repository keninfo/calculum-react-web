import React, { useContext } from 'react'

import { OptionsContext } from '@/components/AppProviders'
import Select from '@/components/common/Select'

const coins = ['BTC Smoothcoin 3X', 'BTC Smoothcoin', 'ETH Smoothcoin', 'PEPE Smoothcoin']

const CoinSelect = () => {
  const { coin, setCoin } = useContext(OptionsContext)

  return <Select handleChange={(e) => setCoin(e.target.value)} value={coin} options={coins} />
}

export default CoinSelect
