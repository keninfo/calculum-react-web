import React from 'react'

import Card from '@/components/common/Card'
import { useStrategyStore } from '@/store/useStrategyStore'

import InfoMomentum from './InfoMomentum'

const MomentumMetrics = () => {
  const { coin } = useStrategyStore()

  if (coin == 'BTC') {
    return (
      <Card className="min-h-fit w-full !bg-transparent md:!p-0 [&_p]:text-left" title="Product Metrics">
        <InfoMomentum />
        {/* <div className={`${!small && 'flex justify-center'}`}>
          <CalendarMomentum title={strategy + ' ' + coin} color="primary" />
          <Calendar title={coin + ' Raw'} color="offWhite" />
        </div> */}
      </Card>
    )
  }
}

export default MomentumMetrics
