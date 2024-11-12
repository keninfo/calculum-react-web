'use client'

import React, { useState } from 'react'

import Image from 'next/image'

import Card from '../common/Card'
import LightweightChart from './LightweightChart.tsx'
import { products } from './products.ts'
import type { productType } from './products.ts'

const Product = ({ strategy, coin, symbol, icon, path }: productType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <Card className="w-full text-center" key={symbol}>
      <img src={icon} width={50} height={50} alt={symbol} className="mx-auto rounded-full md:mx-auto md:mt-1" />
      <h4>{strategy + ' ' + coin}</h4>
      <h5 className="text-xs text-grey">{symbol}</h5>
      <button className="mt-3 rounded-md bg-primary px-8 py-2 text-offWhite" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Hide Data' : 'Show Data'}
      </button>
      {isOpen && <LightweightChart csvPath={path} />}
    </Card>
  )
}

const Index = () => {
  return (
    <>
      <div className="mb-10 md:w-[60%]">
        <Image src="/wordmark.svg" width={50} height={100} alt="image" className="h-auto w-full" />
        <h1 className="my-5 text-left text-4xl">at</h1>
        <img
          src="https://devcon.org/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Foverlay-left-dc7.b828cce0.png&w=1920&q=75"
          alt="image"
          className="h-auto w-[70%]"
        />
      </div>
      <div className="my-10 items-center justify-between text-left md:text-left">
        <h3 className="text-3xl font-bold text-citron">Momentum</h3>
        <p className="mt-4 text-justify text-grey">
          In crypto, there is big prospect of massive returns that attracts investors and traders. However, with high
          returns comes high risk.
        </p>
        <p className="mt-2 text-justify text-grey">
          This is where momentum strategies come in — by riding the trends, these strategies aim to capture gains during
          bull cycles where tokens can rally 10x in and protect wealth during bearish cycles where tokens as go down as
          much as -95%.
        </p>
        <ul className="mt-10 space-y-5">
          {products.map((product, index) => (
            <Product {...product} key={index} />
          ))}
        </ul>
      </div>
    </>
  )
}

export default Index
