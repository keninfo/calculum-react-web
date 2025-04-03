import React from 'react'

import { useRouter } from 'next/navigation'

import type { Abi, Hash } from 'viem'

import { useAccount } from 'wagmi'

import Card from '@/components/common/Card'
import { contractIndex } from '@/contracts/contractIndex'
import ContractReads from '@/hooks/useContractReads'
import { useStrategyStore } from '@/store/useStrategyStore'
import { formatShares } from '@/utils/formatters'

import { PrimaryButton } from '../common/Buttons'

type responseData = [number, bigint, bigint, bigint]

const WorkingContracts = ({
  myPositions = false,
}: {
  myPositions?: boolean
  selectedToken: string
  selectedChain: string
}) => {
  const { setStrategy, setCoin } = useStrategyStore()
  const router = useRouter()
  const { isConnected, address, chainId } = useAccount()

  const goTo = (strategy: string, coin: string) => {
    setStrategy(strategy)
    setCoin(coin)
    localStorage.setItem('strategy', JSON.stringify(strategy))
    localStorage.setItem('coin', JSON.stringify(coin))

    router.push('/dashboard')
  }

  const contractReadResults = contractIndex.map((contract) => {
    if (!contract.isWorking) {
      return { ...contract, finalAmount: '-', isPlaceholder: false }
    }
    const { Deposits, BalanceShares } = ContractReads(contract.address as Hash, contract.abi as Abi)
    const depositsData = Deposits(address).data as responseData | undefined
    const balanceSharesResult = BalanceShares(address).data as bigint | undefined

    let calculatedShares = depositsData ? depositsData[2] : BigInt(0)
    if (calculatedShares <= 0) {
      calculatedShares = balanceSharesResult || BigInt(0)
    }

    const finalAmount = isConnected ? parseFloat(formatShares(calculatedShares)).toLocaleString() : '-'

    return { ...contract, finalAmount, isPlaceholder: false }
  })

  let filtered = contractReadResults.filter((contract) => Number(contract.finalAmount) != 0 && contract.isWorking)

  if (!myPositions) {
    filtered = contractReadResults.filter(
      (contract) => Number(contract.finalAmount) == 0 || contract.finalAmount == '-',
    )
  }

  const placeholdersNeeded = (4 - (filtered.length % 4)) % 4

  for (let i = 0; i < placeholdersNeeded; i++) {
    filtered.push({
      isPlaceholder: true,
      finalAmount: '',
      isWorking: false,
      strategy: '',
      coin: '',
      abi: [],
      address: '',
      chainId: '',
      chain: '',
      symbol: '',
      icon: '',
      info: '',
      decimals: 0,
      chainIcon: '',
    })
  }

  if (filtered.length == 0) {
    return <p className="py-5 text-center text-primary md:ml-6 md:text-left">{`You don't have any open positions`}</p>
  }

  return (
    <>
      {filtered.map((contract, index) => (
        <>
          {contract.isWorking && (
            <Card
              key={index}
              className={`h-full w-full bg-eerie !p-0 ${contract.isPlaceholder ? 'bg-transparent opacity-70' : 'opacity-100'}`}
            >
              {!contract.isPlaceholder ? (
                <div className={`relative grid w-full grid-cols-2 rounded-md border border-offWhite`}>
                  <div className="col-span-1 p-4">
                    <div className="flex items-center justify-start space-x-2">
                      <img src={contract.icon} width={50} height={50} alt={contract.symbol} className="h-6 w-6" />
                    </div>
                    <div className="space-y-6 pt-2">
                      <div>
                        <p className="text-xs text-grey">Token</p>
                        <h2 className="w-full text-nowrap text-left text-2xl font-medium">{contract.symbol}</h2>
                      </div>
                      <div>
                        <p className="text-left text-xs text-grey">Token Balance</p>
                        {contract.chainId == chainId?.toString() ? (
                          <h2 className="w-full text-nowrap text-left text-lg font-medium">{contract.finalAmount}</h2>
                        ) : (
                          <h2 className="w-full text-nowrap text-left text-xs text-payne">
                            {isConnected ? 'Switch Network' : 'Connect Wallet'}
                          </h2>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 p-4">
                    <div className="flex items-center justify-end space-x-2">
                      <img src={contract.chainIcon} width={50} height={50} alt={contract.symbol} className="h-6 w-6" />
                    </div>
                    <div className="space-y-2 pt-2">
                      <div>
                        <p className="text-right text-xs text-grey">Strategy</p>
                        <h2 className="-mb-1 w-full text-nowrap text-right text-lg font-medium">{contract.strategy}</h2>
                        <div className="flex justify-end">
                          <a
                            className="text-xs font-light text-primary underline"
                            href={
                              contract.strategy == 'Momentum'
                                ? 'https://hodlprotocol.gitbook.io/hodl-academy/understanding-momentum/what-is-momentum'
                                : 'https://hodlprotocol.gitbook.io/hodl-academy/understanding-smoothcoins/what-are-smoothcoins'
                            }
                            target="_blank"
                          >
                            Learn more
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pl-6">
                      <PrimaryButton
                        handleClick={() => goTo(contract.strategy, contract.coin)}
                        className="!rounded-md !py-1 text-sm"
                      >
                        <p className="flex w-full items-center justify-center space-x-6">
                          {Number(contract.finalAmount) > 0 || contract.finalAmount == '-' ? 'View' : 'View'}
                        </p>
                      </PrimaryButton>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden h-full w-full border-spacing-5 rounded-md border border-dashed md:block">
                  <p></p>
                </div>
              )}
            </Card>
          )}
          {!contract.isWorking && (
            <Card
              key={index}
              className={`h-full w-full bg-black !p-0 ${contract.isPlaceholder ? 'bg-transparent opacity-70' : 'opacity-90'}`}
            >
              {!contract.isPlaceholder ? (
                <div className={`relative grid h-full w-full grid-cols-2 rounded-md border border-black`}>
                  <div className="col-span-1 p-4">
                    <div className="flex items-center justify-start space-x-2">
                      <img src={contract.icon} width={50} height={50} alt={contract.symbol} className="h-6 w-6" />
                    </div>
                    <div className="space-y-5 pt-2">
                      <div>
                        <p className="text-xs text-grey">Token</p>
                        <h2 className="w-full text-nowrap text-left text-2xl font-medium">{contract.symbol}</h2>
                      </div>
                      <div>
                        <p className="text-left text-xs text-grey">Launching</p>
                        <h2 className="w-full text-nowrap text-left text-lg font-medium">Q2 2025</h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 p-4">
                    <div className="h-6 w-6"></div>
                    <div className="space-y-2 pt-2">
                      <div>
                        <p className="text-right text-xs text-grey">Strategy</p>
                        <h2 className="-mb-1 w-full text-nowrap text-right text-lg font-medium">{contract.strategy}</h2>
                        <div className="flex justify-end">
                          <a
                            className="text-xs font-light text-primary underline"
                            href={
                              contract.strategy == 'Momentum'
                                ? 'https://hodlprotocol.gitbook.io/hodl-academy/understanding-momentum/what-is-momentum'
                                : 'https://hodlprotocol.gitbook.io/hodl-academy/understanding-smoothcoins/what-are-smoothcoins'
                            }
                            target="_blank"
                          >
                            Learn more
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pl-6">
                      <PrimaryButton
                        handleClick={() => goTo(contract.strategy, contract.coin)}
                        className="!rounded-md bg-robin !py-1 text-sm"
                      >
                        <p className="flex w-full items-center justify-center space-x-6">
                          Preview
                          {/* <FontAwesomeIcon icon={['fas', 'arrow-right' as IconName]} className='-rotate-45 ml-1' /> */}
                        </p>
                      </PrimaryButton>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden h-full w-full border-spacing-5 rounded-md border border-dashed md:block">
                  <p></p>
                </div>
              )}
            </Card>
          )}
        </>
      ))}
    </>
  )
}

export default WorkingContracts
