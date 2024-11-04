import React, { useContext } from 'react'

import Select from '@/components/common/Select'
import { OptionsContext } from '@/contexts/OptionsContext'

const coins = ['BTC']

const CoinSelect = () => {
  const { coin, setCoin } = useContext(OptionsContext)

  return <Select handleChange={(e) => setCoin(e.target.value)} value={coin} options={coins} />
}

export default CoinSelect
