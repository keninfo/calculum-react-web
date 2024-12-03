import React from 'react'

import Card from '@/components/common/Card'
import { useStrategyStore } from '@/store/useStrategyStore'

import Calendar from './Calendar'
import CalendarMomentum from './CalendarMomentum'
import Info from './Info'

const ProductMetrics = ({ small = false }: { small?: boolean }) => {
  const { coin, strategy } = useStrategyStore()

  if (coin == 'BTC') {
    return (
      <Card className="min-h-fit w-full !bg-transparent md:!p-0 [&_p]:text-left" title="Product Metrics">
        <Info />
        <div className={`${!small && 'flex justify-center'}`}>
          <CalendarMomentum title={strategy + ' ' + coin} color="primary" />
          <Calendar title={coin + ' Raw'} color="offWhite" />
        </div>
      </Card>
    )
  }
}

export default ProductMetrics
