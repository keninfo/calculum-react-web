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
        <h5>Volatility Targeting</h5>
        <p>
          {' '}
          Volatility targeting adjusts asset allocation to maintain a consistent portfolio risk level. It involves
          changing exposure based on market volatility to meet a set volatility target. This strategy aims to stabilize
          returns and manage risk effectively.
        </p>
        <h5>Disclaimers</h5>
        <p>
          {' '}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos porro veniam maiores soluta quam.
          Corporis animi expedita repellendus molestias ratione, possimus nobis iste dolore eligendi veritatis ad
          assumenda earum! Debitis.
        </p>
      </div>
    </Card>
  )
}

export default AssetInfo
