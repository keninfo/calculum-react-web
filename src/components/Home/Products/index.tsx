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
    apy: parseFloat((Math.random() * 10).toFixed(2)),
    composition: parseFloat((Math.random() * 10).toFixed(4)),
    value: parseFloat((Math.random() * 10).toFixed(4)),
  },
  {
    asset: 'ETH',
    apy: parseFloat((Math.random() * 10).toFixed(2)),
    composition: parseFloat((Math.random() * 10).toFixed(4)),
    value: parseFloat((Math.random() * 10).toFixed(4)),
  },
  {
    asset: 'SOL',
    apy: parseFloat((Math.random() * 10).toFixed(2)),
    composition: parseFloat((Math.random() * 10).toFixed(4)),
    value: parseFloat((Math.random() * 10).toFixed(4)),
  },
  {
    asset: 'ADA',
    apy: parseFloat((-Math.random() * 10).toFixed(2)),
    composition: parseFloat((Math.random() * 10).toFixed(4)),
    value: parseFloat((Math.random() * 10).toFixed(4)),
  },
  {
    asset: 'FIL',
    apy: parseFloat((-Math.random() * 10).toFixed(2)),
    composition: parseFloat((Math.random() * 10).toFixed(4)),
    value: parseFloat((Math.random() * 10).toFixed(4)),
  },
  {
    asset: 'BTC',
    apy: parseFloat((-Math.random() * 10).toFixed(2)),
    composition: parseFloat((Math.random() * 10).toFixed(4)),
    value: parseFloat((Math.random() * 10).toFixed(4)),
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
        className="border-b-2 border-darkness cursor-pointer hover:scale-105"
        onClick={() => handleTableRowClick(element)}
      >
        <td>
          <img
            src={`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/${element.asset.toLowerCase()}.svg`}
            alt="coin icon"
            className="size-[2rem]"
          ></img>
        </td>
        <td className={`py-4 ${element.asset === coin ? 'text-carmesi' : ''}`}>{element.asset}</td>
        <td className="py-4">{element.apy}%</td>
        <td className="py-4">{element.composition}%</td>
        <td className="py-4">${element.value}</td>
      </tr>
    )
  }

  return (
    <div>
      <h1 className="text-3xl text-carmesi">Collateral</h1>
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
