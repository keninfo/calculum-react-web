import React from 'react'

import ContractReads from '@/hooks/useContractReads'

import CollateralsTableItem from './CollateralsTableItem'

const CollateralsTable = () => {
  const { TotalAssets } = ContractReads()

  const total = TotalAssets().data as bigint

  return (
    <div className="w-[80vw] md:border-r md:pr-[5vh] md:w-fit">
      <h1 className="text-xl mb-[2vh] text-left font-bold border-b-carmesi border-b-4 pb-1">COLLATERAL</h1>
      <table className="table-fixed text-left w-full md:w-fit">
        <tbody className="text-2xl">{CollateralsTableItem(total)}</tbody>
      </table>
    </div>
  )
}

export default CollateralsTable
