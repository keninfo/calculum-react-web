import React from 'react'

import Card from '@/components/common/Card'

import CoinSelect from './CoinSelect'
import NetworkSelect from './NetworkSelect'
import StrategySelect from './StrategySelect'

const StrategyOptions = () => {
  return (
    <div>
      {/* DESKTOP */}
      <Card className="hidden w-full items-center justify-between md:flex">
        <div className="flex w-full items-center justify-start space-x-10">
          <StrategySelect />
          <CoinSelect />
        </div>
        <NetworkSelect />
      </Card>
    </div>
  )
}

export default StrategyOptions
