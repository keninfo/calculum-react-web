import React from 'react'

import Card from '@/components/common/Card'

import CoinSelect from './CoinSelect'
import NetworkSelect from './NetworkSelect'
import StrategySelect from './StrategySelect'

const StrategyOptions = () => {
  return (
    <>
      {/* DESKTOP */}
      <Card className="hidden w-full items-center justify-between md:flex">
        <div className="flex w-full items-center justify-start space-x-10">
          <StrategySelect />
          <CoinSelect />
        </div>
        <NetworkSelect />
      </Card>
      {/* MOBILE */}
      <Card className="flex w-full flex-col items-center space-y-4 md:hidden">
        <StrategySelect />
        <CoinSelect />
        <NetworkSelect />
      </Card>
    </>
  )
}

export default StrategyOptions
