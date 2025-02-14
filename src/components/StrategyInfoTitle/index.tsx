import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, { useContext, useMemo } from 'react'

import { useRouter } from 'next/navigation'

import { useAccount } from 'wagmi'

import Card from '@/components/common/Card'
import { CoinsContext } from '@/contexts/CoinsContext'
import useContract from '@/hooks/useContract'
import ContractReads from '@/hooks/useContractReads'
import { useStrategyStore } from '@/store/useStrategyStore'
import { formatBalance } from '@/utils/formatters'

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
  const { isConnected } = useAccount()
  const { values } = useContext(CoinsContext)
  const router = useRouter()

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

  const returnHome = () => {
    router.push('/')
  }

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
    <Card
      className={`left-0 top-0 z-50 w-full items-center justify-between !bg-transparent bg-cover bg-fixed bg-center !px-0 !py-0 md:relative md:z-10 md:flex md:space-x-5`}
    >
      {/* <img src={icon} width={50} height={50} alt="image" className="m-auto rounded-full" /> */}

      <div className="items-center justify-between md:w-full">
        <button
          className="fixed bottom-5 left-5 text-nowrap rounded-md border border-primary bg-black px-4 py-1 text-sm hover:text-primary md:relative md:bottom-0 md:left-0 md:mb-0 md:w-fit"
          onClick={() => returnHome()}
        >
          <FontAwesomeIcon icon={['fas', 'chevron-left' as IconName]} className="mr-2" />
          {`Back`}
        </button>
        <div className="mx-auto mt-6 flex w-full flex-col items-center justify-start md:mx-0 md:mt-2 md:flex-row md:items-center md:space-x-6">
          <h1 className="w-fit text-nowrap bg-black text-3xl text-primary">
            {strategy} {coin}
          </h1>
          <div className="text-md flex w-full items-center justify-center space-x-2 pr-4 text-offWhite md:justify-start">
            <div className="h-3 w-3 animate-pulse rounded-full bg-primary"></div>
            <p className="bg-black">TESTNET (Arbitrum Sepolia)</p>
          </div>
          {coin === 'BTC' && !isConnected && (
            <p className="hidden w-full bg-black text-center text-true md:block md:text-right md:text-xl">
              Connect your wallet to get started{' '}
              <FontAwesomeIcon icon={['fas', 'arrow-up' as IconName]} className="ml-2" />
            </p>
          )}
          {coin !== 'BTC' && (
            <p className="w-full bg-black text-center text-true md:text-right md:text-xl">
              The contract for this token is coming soon!
            </p>
          )}
        </div>

        {values && coin == 'BTC' && (
          <>
            <div className="text-md hidden w-fit items-center justify-start text-nowrap bg-black text-grey md:flex">
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
    </Card>
  )
}

export default StrategyInfoTitle
