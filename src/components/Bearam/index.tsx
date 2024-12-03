import { useFavicon } from '@uidotdev/usehooks'
import { useDocumentTitle } from '@uidotdev/usehooks'

import React, { useEffect } from 'react'

import Image from 'next/image'

import { useStrategyStore } from '@/store/useStrategyStore'

import Card from '../common/Card'
import ChartsContainer from './ChartsContainer/Index'
import CoinSelect from './CoinSelect'
import Footer from './Footer'
import Navbar from './Navbar'
import ProductMetrics from './ProductMetrics'
import StrategySelect from './StrategySelect'

const Bearam = () => {
  const { setStrategy } = useStrategyStore()
  const [favicon] = React.useState('/favicon.png')

  useFavicon(favicon)
  useDocumentTitle('Bearam | Dashboard')

  useEffect(() => {
    setStrategy('Alpha One')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <Card className="h-20 w-full !bg-[#e7eced]">
          <div className="flex w-full items-center justify-start space-x-5">
            <p className="text-xl text-grey">Strategy: </p>
            <StrategySelect />
            <CoinSelect />
          </div>
        </Card>
        <div className="grid h-4/5 grid-cols-12 gap-4">
          <Card className="col-span-10 h-full w-full !bg-[#e7eced]">
            <ChartsContainer />
          </Card>
          <Card className="col-span-2 h-full w-full !bg-[#e7eced]">
            <ProductMetrics />
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Bearam
