import React from 'react'

import Card from '@/components/common/Card'
import { useStrategyStore } from '@/store/useStrategyStore'

import Info from './Info'

const ProductMetrics = ({ small = false }: { small?: boolean }) => {
  const { coin } = useStrategyStore()

  if (coin == 'BTC') {
    return (
      <Card className="h-full w-full [&_p]:text-left" title="Product Metrics">
        <Info small={small} />
        {/* <div className={`${!small && 'flex justify-center'}`}>
          <CalendarMomentum title={strategy + ' ' + coin} color="primary" />
          <Calendar title={coin + ' Raw'} color="offWhite" />
        </div> */}
      </Card>
    )
  }
}

export default ProductMetrics
