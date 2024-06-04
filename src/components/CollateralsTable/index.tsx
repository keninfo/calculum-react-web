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
    <div className="border-r pr-[5vh]">
      <h1 className="text-2xl mb-[2vh] text-center">COLLATERAL</h1>
      <table className="table-fixed text-left mx-[1vw]">
        <tbody className="text-2xl">{sampleData.map((element) => CollateralsTableItem(element))}</tbody>
      </table>
    </div>
  )
}

export default CollateralsTable
