import React from 'react'

import Select from '@/components/common/Select'

const networks = ['Arb. Sepolia']

const NetworkSelect = () => {
  return <Select value={networks[0]} options={networks} />
}

export default NetworkSelect
