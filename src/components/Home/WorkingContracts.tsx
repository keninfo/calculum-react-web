import React from 'react'

import { useRouter } from 'next/navigation'

import Card from '@/components/common/Card'
import { contractIndex } from '@/contracts/contractIndex'
import { useStrategyStore } from '@/store/useStrategyStore'

const WorkingContracts = () => {
  const { setStrategy, setCoin } = useStrategyStore()
  const router = useRouter()

  const goTo = (strategy: string, coin: string) => {
    setStrategy(strategy)
    setCoin(coin)
    localStorage.setItem('strategy', JSON.stringify(strategy))
    localStorage.setItem('coin', JSON.stringify(coin))
    router.push('/dashboard')
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {contractIndex
        .filter((contract) => contract.isWorking)
        .map((contract, index) => (
          <Card className="w-full" key={index}>
            <div className="items-start justify-start md:flex md:space-x-5">
              <div className="w-full">
                <h2 className="w-full text-nowrap text-center text-[7vw] font-medium md:text-left md:text-4xl">
                  {contract.strategy} {contract.coin}
                </h2>
                <p className="w-full text-nowrap text-center text-xs text-citron md:text-left md:text-sm">
                  Arbitrum Sepolia <b className="font-light text-offWhite">- Testnet</b>
                </p>
                <p className="mt-5 w-[80%] text-center text-grey md:text-left md:text-lg">{contract.info}</p>

                <div className="mt-5 md:flex md:w-full md:justify-between">
                  <button
                    className="mt-5 w-full rounded-lg bg-primary px-5 py-2 md:mt-0 md:w-fit"
                    onClick={() => goTo(contract.strategy, contract.coin)}
                  >
                    <p className="text-dark">Start Trading</p>
                  </button>
                </div>
              </div>
              <img
                src={contract.icon}
                width={50}
                height={50}
                alt={contract.symbol}
                className="mx-auto rounded-full md:mx-0 md:mt-1"
              />
            </div>
          </Card>
        ))}
    </div>
  )
}

export default WorkingContracts
