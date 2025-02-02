import React, { useContext, useMemo } from 'react'

import { CoinsContext } from '@/contexts/CoinsContext'
import useContract from '@/hooks/useContract'
import ContractReads from '@/hooks/useContractReads'
import { useProStore } from '@/store/useProStore'
import { useStrategyStore } from '@/store/useStrategyStore'
import { formatBalance } from '@/utils/formatters'

import StrategySelect from './StrategySelect'

const placeholder = {
  label: 'BTC Smoothcoin',
  symbol: 'smBTC',
  value: '0',
  change: 0,
  token: 'BTC',
  tokenValue: '0',
  tokenChange: 0,
  active: true,
  icon: '/bearLogo.png',
}

const StrategyInfoTitle = () => {
  const { coin, strategy } = useStrategyStore()
  const { contractAddress, contractAbi, symbol, icon, isWorking } = useContract()
  const { values } = useContext(CoinsContext)
  const { pro } = useProStore()

  const currentEpochData = ContractReads(contractAddress, contractAbi).CurrentEpoch().data as bigint
  const daySharePriceData = ContractReads(contractAddress, contractAbi).EpochSharePrice(Number(currentEpochData) - 1)
    .data as bigint
  const previousDaySharePriceData = ContractReads(contractAddress, contractAbi).EpochSharePrice(
    Number(currentEpochData) - 6,
  ).data as bigint

  const pricePercentageChange = useMemo(() => {
    if (!daySharePriceData || !previousDaySharePriceData) return 0
    return (Number(daySharePriceData) / Number(previousDaySharePriceData) - 1) * 100
  }, [daySharePriceData, previousDaySharePriceData])

  const strategyInfo = useMemo(() => {
    if (!values) return placeholder

    const previousValue = values[1][values[1].length - 2]
    const currentValue = values[1][values[1].length - 1]

    const tokenChangePercentage = (currentValue / previousValue - 1) * 100

    return {
      label: `${strategy} ${coin}`,
      symbol,
      value: formatBalance(daySharePriceData) as string,
      change: pricePercentageChange,
      token: coin,
      tokenValue: currentValue.toLocaleString('en-US'),
      tokenChange: tokenChangePercentage,
      active: isWorking,
      icon,
    }
  }, [values, strategy, coin, symbol, daySharePriceData, pricePercentageChange, isWorking, icon])

  return (
    <div
      className={`left-0 top-0 z-50 items-center justify-between bg-cover bg-fixed bg-center py-5 md:relative md:z-10 md:flex md:space-x-5 md:px-2 ${pro ? "bg-[url('/stars.jpeg')]" : "bg-[url('/bg.png')]"}`}
    >
      {/* <img src={icon} width={50} height={50} alt="image" className="m-auto rounded-full" /> */}
      <div className="items-center justify-between md:w-full">
        <div className="mx-auto w-fit md:mx-0">
          <StrategySelect />
        </div>

        {coin !== 'BTC' && (
          <p className="w-full text-center text-true md:text-left md:text-xl">
            The contract for this token is coming soon!
          </p>
        )}
        {values && coin == 'BTC' && (
          <>
            <div className="text-md hidden w-fit items-center justify-start text-nowrap text-grey md:flex">
              <p>{`Yesterday's closing price - `}</p>

              <p className="mx-1">{strategyInfo.token}:</p>
              <p className="mr-1 text-offWhite">${strategyInfo.tokenValue}</p>
              <p>{`(`}</p>
              <p
                className={`${strategyInfo.tokenChange > 0 ? 'text-spring' : strategyInfo.tokenChange < 0 ? 'text-fire' : 'text-grey'}`}
              >
                {strategyInfo.tokenChange.toLocaleString('US')}%
              </p>
              <p className="mr-1">{`)`}</p>
              <p className="mr-1">- {strategyInfo.symbol}: </p>
              <p className="mr-1 text-offWhite">${strategyInfo.value}</p>
              <p>{`(`}</p>
              <p
                className={`${strategyInfo.change > 0 ? 'text-spring' : strategyInfo.change < 0 ? 'text-fire' : 'text-grey'}`}
              >
                {strategyInfo.change.toLocaleString('US')}%
              </p>
              <p className="mr-1">{`)`}</p>
            </div>
            {/* mobile */}
            <div className="text-md mt-4 w-full text-nowrap text-grey md:hidden">
              <p className="text-center">{`Yesterday's closing price`}</p>
              <div className="flex items-center justify-center">
                <p className="mx-1">{strategyInfo.token}:</p>
                <p className="mr-1 text-offWhite">${strategyInfo.tokenValue}</p>
                <p>{`(`}</p>
                <p
                  className={`${strategyInfo.tokenChange > 0 ? 'text-spring' : strategyInfo.tokenChange < 0 ? 'text-fire' : 'text-grey'}`}
                >
                  {strategyInfo.tokenChange.toLocaleString('US')}%
                </p>
                <p className="mr-1">{`)`}</p>
              </div>
              <div className="flex items-center justify-center">
                <p className="mr-1">{strategyInfo.symbol}: </p>
                <p className="mr-1 text-offWhite">${strategyInfo.value}</p>
                <p>{`(`}</p>
                <p
                  className={`${strategyInfo.change > 0 ? 'text-spring' : strategyInfo.change < 0 ? 'text-fire' : 'text-grey'}`}
                >
                  {strategyInfo.change.toLocaleString('US')}%
                </p>
                <p className="mr-1">{`)`}</p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="text-md mt-4 flex w-full items-center justify-center space-x-2 pr-4 text-offWhite md:mt-0 md:justify-end">
        <div className="h-3 w-3 animate-pulse rounded-full bg-primary"></div>
        <p>TESTNET (Arbitrum Sepolia)</p>
      </div>
      {/* <News /> */}
    </div>
  )
}

export default StrategyInfoTitle
