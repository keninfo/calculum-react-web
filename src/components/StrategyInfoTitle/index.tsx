import React, { useContext, useMemo } from 'react'

import { CoinsContext } from '@/contexts/CoinsContext'
import useContract from '@/hooks/useContract'
import ContractReads from '@/hooks/useContractReads'
import { useStrategyStore } from '@/store/useStrategyStore'
import { formatBalance } from '@/utils/formatters'

import News from './News'

const placeholder = {
  label: 'BTC Smoothcoin',
  symbol: 'smBTC',
  value: '0',
  change: '0%',
  token: 'BTC',
  tokenValue: '0',
  tokenChange: '0%',
  active: true,
  icon: '/bearLogo.png',
}

const StrategyInfoTitle = () => {
  const { coin, strategy } = useStrategyStore()
  const { contractAddress, contractAbi, symbol, icon, isWorking } = useContract()
  const { values } = useContext(CoinsContext)

  const currentEpochData = ContractReads(contractAddress, contractAbi).CurrentEpoch().data as bigint
  const daySharePriceData = ContractReads(contractAddress, contractAbi).EpochSharePrice(Number(currentEpochData) - 1)
    .data as bigint
  const previousDaySharePriceData = ContractReads(contractAddress, contractAbi).EpochSharePrice(
    Number(currentEpochData) - 4,
  ).data as bigint

  const pricePercentageChange = useMemo(() => {
    if (!daySharePriceData || !previousDaySharePriceData) return 0
    return ((Number(daySharePriceData) - Number(previousDaySharePriceData)) / Number(previousDaySharePriceData)) * 100
  }, [daySharePriceData, previousDaySharePriceData])

  const strategyInfo = useMemo(() => {
    if (!values) return placeholder

    const previousValue = values[1][values[1].length - 2]
    const currentValue = values[1][values[1].length - 1]

    const tokenChangePercentage = ((currentValue - previousValue) / previousValue) * 100

    return {
      label: `${strategy} ${coin}`,
      symbol,
      value: formatBalance(daySharePriceData) as string,
      change: `${pricePercentageChange.toFixed(2)}%`,
      token: coin,
      tokenValue: currentValue.toLocaleString('en-US'),
      tokenChange: `${tokenChangePercentage.toFixed(2)}%`,
      active: isWorking,
      icon,
    }
  }, [values, strategy, coin, symbol, daySharePriceData, pricePercentageChange, isWorking, icon])

  return (
    <div className="items-center justify-between py-5 md:flex md:space-x-5 md:pl-2">
      <img src={icon} width={50} height={50} alt="image" className="m-auto rounded-full" />
      <div className="md:w-fit">
        <h2 className="w-full text-nowrap text-center text-3xl font-bold md:text-left md:text-4xl">
          {strategyInfo.label}
        </h2>
        {values && (
          <p className="w-full text-nowrap text-center text-xs text-citron md:text-left md:text-sm">
            {strategyInfo.symbol}: ${strategyInfo.value} ({strategyInfo.change}) - {strategyInfo.token}: $
            {strategyInfo.tokenValue} ({strategyInfo.tokenChange}) - Last 24H
          </p>
        )}
      </div>
      <News />
    </div>
  )
}

export default StrategyInfoTitle
