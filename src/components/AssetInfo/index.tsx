import React, { useContext } from 'react'

import { CoinContext } from '@/components/AppProviders'
import Card from '@/components/common/Card'
import CryptoIcon from '@/components/common/CryptoIcon'

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
          Volatility: Cryptocurrency prices can experience extreme fluctuations within short periods, driven by various
          factors such as market demand, regulatory developments, technological advancements, and investor sentiment.
          These fluctuations may lead to substantial gains or losses in a short amount of time.
        </p>
      </div>
    </Card>
  )
}

export default AssetInfo
