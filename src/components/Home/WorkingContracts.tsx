import React from 'react'

import { useRouter } from 'next/navigation'

import Card from '@/components/common/Card'
import { contractIndex } from '@/contracts/contractIndex'
import { useStrategyStore } from '@/store/useStrategyStore'

const WorkingContracts = () => {
  const { setStrategy } = useStrategyStore()
  const router = useRouter()

  const goTo = (strategy: string) => {
    setStrategy(strategy)
    router.push('/dashboard')
  }

  return (
    <div className="space-y-5">
      {contractIndex
        .filter((contract) => contract.isWorking)
        .map((contract, index) => (
          <Card className="w-full" key={index}>
            <div className="items-start justify-start md:flex md:space-x-5">
              <img
                src={contract.icon}
                width={50}
                height={50}
                alt={contract.symbol}
                className="mx-auto rounded-full md:mx-0 md:mt-1"
              />
              <div className="w-full">
                <h2 className="w-full text-nowrap text-center text-[7vw] font-bold md:text-left md:text-4xl">
                  {contract.strategy} {contract.coin}
                </h2>
                <p className="w-full text-nowrap text-center text-xs text-citron md:text-left md:text-sm">
                  Arbitrum Sepolia <b className="font-light text-offWhite">- Testnet</b>
                </p>
                <p className="mt-5 text-center text-grey md:w-[50%] md:text-left md:text-2xl">{contract.info}</p>

                <div className="mt-5 md:flex md:w-full md:justify-between">
                  <div className="text-center">
                    <p>{`<<- STATS PLACEHOLDER ->>`}</p>
                  </div>
                  <button
                    className="mt-5 w-full rounded-lg bg-primary px-5 py-2 md:mt-0 md:w-fit"
                    onClick={() => goTo(contract.strategy)}
                  >
                    <p className="text-offWhite">Start Trading</p>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
    </div>
  )
}

export default WorkingContracts
