import React from 'react'

import { useStrategyStore } from '@/store/useStrategyStore'

import Info from './Info'

const ProductMetrics = ({ small = false }: { small?: boolean }) => {
  const { coin } = useStrategyStore()

  if (coin == 'BTC') {
    return (
      <>
        <div className="hidden md:block">
          <Info small={small} />
        </div>
        <div className="md:hidden">
          <Info small={true} />
        </div>
      </>
    )
  }
}

export default ProductMetrics
