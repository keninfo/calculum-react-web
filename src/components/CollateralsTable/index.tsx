import React from 'react'

import ContractReads from '@/hooks/useContractReads'

import CollateralsTableItem from './CollateralsTableItem'

const CollateralsTable = () => {
  const { TotalAssets } = ContractReads()

  const total = TotalAssets().data as bigint

  return (
    <div className="w-full md:w-fit md:border-r md:p-4 md:pr-[5vh]">
      <h1 className="mb-[2vh] border-b-4 border-b-carmesi pb-2 text-center text-xl font-bold md:text-left">
        COLLATERAL
      </h1>
      <table className="w-full table-fixed text-left md:w-fit">
        <tbody className="text-2xl">{CollateralsTableItem(total)}</tbody>
      </table>
    </div>
  )
}

export default CollateralsTable
