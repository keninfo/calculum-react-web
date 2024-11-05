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
        <div className="flex w-full items-center justify-start space-x-5">
          <p className="text-grey">STRATEGY: </p>
          <StrategySelect />
          <CoinSelect />
        </div>
        <div className="flex w-fit items-center justify-start space-x-5">
          <p className="text-grey">NETWORK: </p>
          <NetworkSelect />
        </div>
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
