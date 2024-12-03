import React from 'react'

import Image from 'next/image'

import Card from '../common/Card'
import CoinSelect from './CoinSelect'
import Navbar from './Navbar'
import StrategySelect from './StrategySelect'

const Bearam = () => {
  return (
    <div className="h-screen w-screen bg-[#5622AA]">
      <Image
        src="/bearambg.png"
        alt=""
        className="pointer-events-none fixed -top-1 right-0 z-0 w-screen bg-cover mix-blend-multiply"
        style={{ height: `calc(100vh + ${4}px)` }}
        width="1000"
        height="1000"
      />
      <div className="absolute z-50">
        <Navbar />
      </div>
      <div className={`z-20 h-full space-y-4 px-20 py-32`}>
        <Card className="h-20 w-full bg-[#e7eced]">
          <div className="flex w-full items-center justify-start space-x-5">
            <p className="text-xl text-grey">Strategy: </p>
            <StrategySelect />
            <CoinSelect />
          </div>
        </Card>
        <Card className="h-full w-full bg-[#e7eced]">
          <></>
        </Card>
      </div>
    </div>
  )
}

export default Bearam
