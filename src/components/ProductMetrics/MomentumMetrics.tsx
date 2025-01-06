import React from 'react'

import Card from '@/components/common/Card'
import { useStrategyStore } from '@/store/useStrategyStore'

import InfoMomentum from './InfoMomentum'

const MomentumMetrics = ({ small = false }: { small?: boolean }) => {
  const { coin } = useStrategyStore()

  if (coin == 'BTC') {
    return (
      <Card className="h-full w-full !p-0 [&_p]:text-left" title="Product Metrics">
        <InfoMomentum small={small} />
        {/* <div className={`${!small && 'flex justify-center'}`}>
          <CalendarMomentum title={strategy + ' ' + coin} color="primary" />
          <Calendar title={coin + ' Raw'} color="offWhite" />
        </div> */}
      </Card>
    )
  }
}

export default MomentumMetrics
