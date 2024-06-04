import React, { useContext } from 'react'

import { CoinContext } from '@/components/AppProviders'
import CryptoIcon from '@/components/common/CryptoIcon'

import type { coinData } from './sampleData'

const CollateralsTableItem = (element: coinData) => {
  const { coin, setCoin } = useContext(CoinContext)

  const handleTableRowClick = (element: coinData) => {
    setCoin(element.asset)
  }
  return (
    <tr
      key={element.asset}
      className="cursor-pointer hover:scale-105 text-sm [&>td]:py-[2vh] [&>td]:border-b [&>td]:border-darkness"
      onClick={() => handleTableRowClick(element)}
    >
      <td className={`flex justify-start items-center mr-[4vw] ${element.asset === coin ? 'text-carmesi' : ''}`}>
        <CryptoIcon coin={element.asset} className="size-[1.5rem] mr-[.5vw]" /> {element.asset}
      </td>
      <td className="text-right">${element.price.toFixed(2)}</td>
    </tr>
  )
}

export default CollateralsTableItem
