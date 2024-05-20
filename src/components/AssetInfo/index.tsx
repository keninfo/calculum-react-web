import React, { useContext } from 'react'

import { CoinContext } from '@/components/AppProviders'

import Card from '../common/Card'
import CryptoIcon from '../common/CryptoIcon'

const AssetInfo = () => {
  const { coin } = useContext(CoinContext)
  return (
    <Card>
      <div className="h-fit w-[20vw] [&>h5]:text-md [&>h5]:text-carmesi [&>h5]:font-bold [&>p]:mb-4 [&>p]:text-xs">
        <div className="flex justify-between ">
          <h4 className="text-3xl mb-4">{coin.toUpperCase()}</h4>
          <CryptoIcon coin={coin} className="size-[2rem]" />
        </div>
        <h5>TVL & Traders</h5>
        <p> Lorem ipsum</p>
        <h5>Product Description</h5>
        <p>
          {' '}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos porro veniam maiores soluta quam.
          Corporis animi expedita repellendus molestias ratione, possimus nobis iste dolore eligendi veritatis ad
          assumenda earum! Debitis
        </p>
        <h5>Risk</h5>
        <p>
          {' '}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos porro veniam maiores soluta quam.
          Corporis animi expedita repellendus molestias ratione, possimus nobis iste dolore eligendi veritatis ad
          assumenda earum! Debitis.
        </p>
        <div className="flex start items-center">
          <h5 className="text-carmesi">Orders made in the past</h5>
          <p className="text-3xl ml-4">0</p>
        </div>
      </div>
    </Card>
  )
}

export default AssetInfo
