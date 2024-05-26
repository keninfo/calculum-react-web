import React, { useContext } from 'react'

import { CoinContext } from '@/components/AppProviders'

import CollateralsTableItem from './CollateralsTableItem'
import { sampleData } from './sampleData'

const CollateralsTable = () => {
  const { coin } = useContext(CoinContext)

  sampleData.forEach((item, i) => {
    if (item.asset === coin) {
      sampleData.splice(i, 1)
      sampleData.unshift(item)
    }
  })

  return (
    <div>
      <h1 className="text-3xl text-carmesi my-[5vh]">Collaterals</h1>
      <table className="w-full table-fixed text-left">
        <thead>
          <tr className="text-sm [&>th]:pb-[4vh] [&>th]:w-fit">
            <th>ASSET</th>
            <th>PRICE</th>
            <th>APY</th>
            <th>MARKET CAP</th>
          </tr>
        </thead>
        <tbody className="text-2xl">{sampleData.map((element) => CollateralsTableItem(element))}</tbody>
      </table>
    </div>
  )
}

export default CollateralsTable
