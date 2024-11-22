import React from 'react'

import Card from '@/components/common/Card'
import { contractIndex } from '@/contracts/contractIndex'

const ComingSoonContracts = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {contractIndex
        .filter((contract) => !contract.isWorking)
        .map((contract, index) => (
          <Card key={index} className="w-full !bg-eerie">
            <div className="items-start justify-between md:flex md:space-x-5">
              <div className="md:w-fit">
                <h2 className="w-full text-nowrap text-center text-[6vw] font-medium md:text-left md:text-4xl">
                  {contract.strategy} {contract.coin}
                </h2>
                <p className="w-full text-nowrap text-center text-xs text-citron md:text-left md:text-sm">
                  Arbitrum Sepolia <b className="font-light text-offWhite">- Testnet</b>
                </p>
                <p className="mt-5 text-center text-grey md:text-left">Coming Q4 2024 to testnet</p>
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

export default ComingSoonContracts
