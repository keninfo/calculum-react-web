import React, { useContext } from 'react'

import { CoinContext } from '@/components/AppProviders'

import CryptoIcon from '../common/CryptoIcon'
import type { coinData } from './sampleData'

const CollateralsTableItem = (element: coinData) => {
  const { coin, setCoin } = useContext(CoinContext)

  const handleTableRowClick = (element: coinData) => {
    setCoin(element.asset)
  }
  return (
    <tr
      key={element.asset} // Added a key prop to ensure each row is unique
      className="cursor-pointer hover:scale-105 text-sm  [&>td]:py-[2vh] [&>td]:border-b [&>td]:border-darkness"
      onClick={() => handleTableRowClick(element)}
    >
      <td className={`flex justify-start items-center ${element.asset === coin ? 'text-carmesi' : ''}`}>
        <CryptoIcon coin={element.asset} className="size-[1.5rem] mr-[2vw]" /> {element.asset}
      </td>
      <td>{element.apy}%</td>
      <td>{element.composition}%</td>
      <td>${element.value}</td>
    </tr>
  )
}

export default CollateralsTableItem
