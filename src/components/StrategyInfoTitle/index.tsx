import React, { useContext } from 'react'

import Image from 'next/image'

import { OptionsContext } from '@/components/AppProviders'
import ContractReads from '@/hooks/useContractReads'
import { formatBalance } from '@/utils/formatters'

import { CoinsContext } from '../AppProviders'
import News from './News'

const StrategyInfoTitle = () => {
  const { coin, strategy } = useContext(OptionsContext)
  const { values } = useContext(CoinsContext)
  const { CurrentEpoch, EpochSharePrice } = ContractReads()

  const epochNumber = CurrentEpoch().data as bigint

  const daySharePrice = EpochSharePrice(Number(epochNumber) - 1).data as bigint
  const previousDaySharePrice = EpochSharePrice(Number(epochNumber) - 4).data as bigint

  const pricePercentageChange =
    ((Number(daySharePrice) - Number(previousDaySharePrice)) / Number(previousDaySharePrice)) * 100

  let BTCSmooth = {
    label: 'BTC Smoothcoin',
    value: 0,
    change: '0%',
    token: 'BTC',
    tokenValue: '0',
    tokenChange: '0%',
    active: true,
  }

  if (values) {
    const previousValue = values[1][values[1].length - 2]
    const currentValue = values[1][values[1].length - 1]

    const tokenChangePercentage = ((currentValue - previousValue) / previousValue) * 100

    BTCSmooth = {
      label: 'BTC Smoothcoin',
      value: 0,
      change: '0',
      token: 'BTC',
      tokenValue: currentValue.toLocaleString('en-US'),
      tokenChange: tokenChangePercentage.toLocaleString('en-US') + '%',
      active: true,
    }
  }

  return (
    <div className="items-center justify-between py-5 md:flex md:space-x-5 md:pl-2">
      <Image src="/bearLogo.png" width={50} height={50} alt="Picture of the author" className="m-auto" />
      <div className="md:w-fit">
        <h2 className="w-full text-nowrap text-center text-3xl font-bold md:text-left md:text-4xl">
          {strategy + ' ' + coin}
        </h2>
        <p className="w-full text-nowrap text-center text-xs text-yellow-300 md:text-left md:text-sm">
          $ {formatBalance(daySharePrice)} ({pricePercentageChange.toFixed(2)}%) - BTC: ${BTCSmooth.tokenValue} (
          {BTCSmooth.tokenChange}) - Last 24H
        </p>
      </div>
      <News />
    </div>
  )
}

export default StrategyInfoTitle
