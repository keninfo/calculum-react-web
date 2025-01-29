import React from 'react'

import { useStrategyStore } from '@/store/useStrategyStore'

import Info from './Info'

const ProductMetrics = ({ small = false }: { small?: boolean }) => {
  const { coin } = useStrategyStore()

  if (coin == 'BTC') {
    return <Info small={small} />
  }
}

export default ProductMetrics
