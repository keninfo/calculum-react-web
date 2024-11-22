'use client'

import React from 'react'

import Image from 'next/image'

import ComingSoonContracts from './ComingSoonContracts'
import WorkingContracts from './WorkingContracts'

const Index = () => {
  return (
    <>
      <div className="mx-auto mb-20 md:w-[60%]">
        <h1 className="mb-5 text-center text-4xl">Welcome to</h1>
        <Image src="/wordmark.svg" width={50} height={100} alt="image" className="h-auto w-full" />
      </div>
      <div className="my-10 items-center justify-between text-center md:flex md:text-left">
        <h3 className="text-3xl">Our Products</h3>
        <div className="hidden rounded-lg bg-dark px-5 py-3 md:block">
          <ul className="flex items-center justify-center space-x-5">
            <li className={`text-citron`}>All</li>
            <li>|</li>
            <li>Arbitrum Sepolia</li>
          </ul>
        </div>
      </div>

      <WorkingContracts />
      <h4 className="my-10 text-3xl text-citron">Coming Soon...</h4>
      <ComingSoonContracts />
    </>
  )
}

export default Index
