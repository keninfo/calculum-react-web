import React from 'react'

import ContractReads from '@/hooks/useContractReads'

import CollateralsTableItem from './CollateralsTableItem'

const CollateralsTable = () => {
  const { TotalAssets } = ContractReads()

  const total = TotalAssets().data as bigint

  return (
    <div className="border-r pr-[5vh]">
      <h1 className="text-2xl mb-[2vh] text-center font-bold border-b-carmesi border-b-4 pb-1">COLLATERAL</h1>
      <table className="table-fixed text-left mx-[1vw]">
        <tbody className="text-2xl">{CollateralsTableItem(total)}</tbody>
      </table>
    </div>
  )
}

export default CollateralsTable
