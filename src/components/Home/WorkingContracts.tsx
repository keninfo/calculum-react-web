import React from 'react'

import { useRouter } from 'next/navigation'

import type { Abi, Hash } from 'viem'

import { useAccount } from 'wagmi'

import Card from '@/components/common/Card'
import { contractIndex } from '@/contracts/contractIndex'
import ContractReads from '@/hooks/useContractReads'
import { useStrategyStore } from '@/store/useStrategyStore'
import { formatShares } from '@/utils/formatters'

import CryptoIcon from '../common/CryptoIcon'

type responseData = [number, bigint, bigint, bigint]

const WorkingContracts = ({ myPositions = false }: { myPositions?: boolean }) => {
  const { setStrategy, setCoin } = useStrategyStore()
  const router = useRouter()
  const { isConnected, address } = useAccount()

  const goTo = (strategy: string, coin: string) => {
    setStrategy(strategy)
    setCoin(coin)
    localStorage.setItem('strategy', JSON.stringify(strategy))
    localStorage.setItem('coin', JSON.stringify(coin))
    router.push('/dashboard')
  }

  // Prepare all contract reads upfront
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
    })
  }

  if (filtered.length == 0) {
    return (
      <p className="bg-black py-5 text-center text-primary md:ml-6 md:text-left">{`You don't have any open positions`}</p>
    )
  }

  return (
    <>
      {filtered.map((contract, index) => (
        <>
          {contract.isWorking && (
            <Card
              key={index}
              className={`h-full w-full bg-eerie !p-0 ${contract.isPlaceholder ? 'bg-transparent opacity-45' : 'opacity-90 hover:opacity-100'}`}
            >
              {!contract.isPlaceholder ? (
                <div
                  className={`relative grid w-full cursor-pointer grid-cols-2 rounded-md border border-offWhite hover:border-primary`}
                  onClick={() => goTo(contract.strategy, contract.coin)}
                >
                  <div className="col-span-1 p-4">
                    <div className="flex items-center justify-start space-x-2">
                      <img src={contract.icon} width={50} height={50} alt={contract.symbol} className="h-6 w-6" />
                      <CryptoIcon coin="USDC" className="h-[20px]" />
                    </div>
                    <div className="space-y-2 pt-2">
                      <div>
                        <p className="text-xs text-grey">Token</p>
                        <h2 className="w-full text-nowrap text-left text-lg font-medium">{contract.symbol}</h2>
                      </div>
                      <div>
                        <p className="text-xs text-grey">Strategy</p>
                        <h2 className="w-full text-nowrap text-left text-lg font-medium">{contract.strategy}</h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 p-4">
                    <div className="h-6 w-6"></div>
                    <div className="space-y-2 pt-2">
                      <div>
                        <p className="text-right text-xs text-grey">Network</p>
                        <h2 className="w-full text-nowrap py-1 text-right text-sm font-medium text-primary">
                          {contract.chain}
                        </h2>
                      </div>
                      <div>
                        <p className="text-right text-xs text-grey">Wallet Balance</p>
                        <h2 className="w-full text-nowrap text-right text-lg font-medium">{contract.finalAmount}</h2>
                      </div>
                    </div>
                  </div>
                  <p className="absolute right-4 top-4 text-xs text-payne">Click to start trading</p>
                </div>
              ) : (
                <div className="h-full w-full border-spacing-5 rounded-md border border-dashed">
                  <p></p>
                </div>
              )}
            </Card>
          )}
          {!contract.isWorking && (
            <Card
              key={index}
              className={`h-full w-full bg-eerie !p-0 ${contract.isPlaceholder ? 'bg-transparent opacity-70' : 'opacity-70 hover:opacity-100'}`}
            >
              {!contract.isPlaceholder ? (
                <div
                  className={`relative grid h-full w-full cursor-pointer grid-cols-2 rounded-md border border-offWhite hover:border-primary`}
                  onClick={() => goTo(contract.strategy, contract.coin)}
                >
                  <div className="col-span-1 p-4">
                    <div className="flex items-center justify-start space-x-2">
                      <img src={contract.icon} width={50} height={50} alt={contract.symbol} className="h-6 w-6" />
                      <CryptoIcon coin="USDC" className="h-[20px]" />
                    </div>
                    <div className="space-y-2 pt-2">
                      <div>
                        <p className="text-xs text-grey">Token</p>
                        <h2 className="w-full text-nowrap text-left text-lg font-medium">{contract.symbol}</h2>
                      </div>
                      <div>
                        <p className="text-xs text-grey">Strategy</p>
                        <h2 className="w-full text-nowrap text-left text-lg font-medium">{contract.strategy}</h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 p-4">
                    <div className="h-6 w-6"></div>
                    <div className="space-y-2 pt-2">
                      <div>
                        <p className="text-right text-xs text-grey">Network</p>
                        <h2 className="w-full text-nowrap pt-1 text-right text-sm font-medium text-robin">
                          {contract.chain}
                        </h2>
                      </div>
                      <div>
                        <p className="text-right text-xs text-grey">Opening</p>
                        <h2 className="w-full text-nowrap text-right text-lg font-medium">Q2 2025</h2>
                      </div>
                    </div>
                  </div>
                  <p className="absolute right-4 top-4 text-xs text-payne">Click to learn more</p>
                </div>
              ) : (
                <div className="h-full w-full border-spacing-5 rounded-md border border-dashed">
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
