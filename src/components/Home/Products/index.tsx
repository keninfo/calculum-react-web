import React, { useContext } from 'react'

import { CoinContext } from '@/components/AppProviders'

export type coinData = {
  asset: string
  apy: number
  composition: number
  value: number
}

const sampleData: coinData[] = [
  {
    asset: 'USDC',
    apy: -1.05,
    composition: 3.3795,
    value: 1.7885,
  },
  {
    asset: 'ETH',
    apy: 8.87,
    composition: 2.2206,
    value: 5.5808,
  },
  {
    asset: 'SOL',
    apy: 6.38,
    composition: 9.1353,
    value: 3.6306,
  },
  {
    asset: 'ADA',
    apy: 5.16,
    composition: 3.5841,
    value: 5.8348,
  },
  {
    asset: 'FIL',
    apy: -1.17,
    composition: 2.6122,
    value: 7.6025,
  },
  {
    asset: 'BTC',
    apy: -0.37,
    composition: 5.1197,
    value: 7.1521,
  },
]

const Products = () => {
  const { coin, setCoin } = useContext(CoinContext)

  sampleData.forEach((item, i) => {
    if (item.asset === coin) {
      sampleData.splice(i, 1)
      sampleData.unshift(item)
    }
  })

  const handleTableRowClick = (element: coinData) => {
    setCoin(element.asset)
  }

  const tableElement = (element: coinData) => {
    return (
      <tr
        key={element.asset} // Added a key prop to ensure each row is unique
        className="cursor-pointer hover:scale-105 text-lg"
        onClick={() => handleTableRowClick(element)}
      >
        <td>
          <img
            src={`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/${element.asset.toLowerCase()}.svg`}
            alt="coin icon"
            className="size-[1.5rem]"
          ></img>
        </td>
        <td className={`py-3 ${element.asset === coin ? 'text-carmesi' : ''}`}>{element.asset}</td>
        <td className="py-3">{element.apy}%</td>
        <td className="py-3">{element.composition}%</td>
        <td className="py-3">${element.value}</td>
      </tr>
    )
  }

  return (
    <div>
      <h1 className="text-3xl text-carmesi mt-10">Collateral</h1>
      <table className="table-auto w-full text-center mt-10">
        <thead>
          <tr className="text-xs">
            <th></th>
            <th className="pb-6">ASSETS</th>
            <th className="pb-6">APY</th>
            <th className="pb-6">COMPOSITION</th>
            <th className="pb-6">VALUE</th>
          </tr>
        </thead>
        <tbody className="text-2xl">{sampleData.map((element) => tableElement(element))}</tbody>
      </table>
    </div>
  )
}

export default Products
