import React, { useContext } from 'react'

import Image from 'next/image'

import { OptionsContext } from '@/components/AppProviders'

import News from './News'

const StrategyInfoTitle = () => {
  const { coin, strategy } = useContext(OptionsContext)

  return (
    <div className="flex items-center justify-between space-x-5 py-5 pl-2">
      <Image src="/bearLogo.png" width={50} height={50} alt="Picture of the author" />
      <div className="w-fit">
        <h2 className="text-nowrap text-4xl font-bold italic">{strategy + ' ' + coin}</h2>
        <p className="text-nowrap text-yellow-300">$1.0 (+0%) - BTC: $72,000 (+20%) - Last 24H</p>
      </div>
      <News />
    </div>
  )
}

export default StrategyInfoTitle
