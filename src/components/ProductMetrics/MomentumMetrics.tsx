import React from 'react'

import { useStrategyStore } from '@/store/useStrategyStore'

import InfoMomentum from './InfoMomentum'

const MomentumMetrics = ({ small = false }: { small?: boolean }) => {
  const { coin } = useStrategyStore()

  if (coin == 'BTC') {
    return (
      <>
        <div className="hidden md:block">
          <InfoMomentum small={small} />
        </div>
        <div className="md:hidden">
          <InfoMomentum small={true} />
        </div>
      </>
    )
  }
}

export default MomentumMetrics
