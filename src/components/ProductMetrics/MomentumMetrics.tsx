import React from 'react'

import { useStrategyStore } from '@/store/useStrategyStore'

import InfoMomentum from './InfoMomentum'

const MomentumMetrics = ({ small = false }: { small?: boolean }) => {
  const { coin } = useStrategyStore()

  if (coin == 'BTC') {
    return <InfoMomentum small={small} />
  }
}

export default MomentumMetrics
