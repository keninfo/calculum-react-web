'use client'

import React, { useContext } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Card from '@/components/common/Card'
import { OptionsContext } from '@/contexts/OptionsContext'

const Index = () => {
  const { setStrategy } = useContext(OptionsContext)
  const router = useRouter()

  const goTo = (selected: number) => {
    if (selected == 0) {
      setStrategy('Smoothcoin')
    } else if (selected == 1) {
      setStrategy('Momentum')
    }

    router.push('/dashboard')
  }

  return (
    <>
      <div className="mx-auto mb-20 md:w-[60%]">
        <h1 className="mb-5 text-center text-4xl">Welcome to</h1>
        <Image src="/wordmark.svg" width={50} height={100} alt="image" className="h-auto w-full" />
      </div>
      <div className="my-10 items-center justify-between text-center md:flex md:text-left">
        <h3 className="text-3xl">Meet Our Products</h3>
        <div className="hidden rounded-lg bg-darkness px-5 py-3 md:block">
          <ul className="flex items-center justify-center space-x-5">
            <li className={`text-yellow-300`}>All</li>
            <li>|</li>
            <li>Arbitrum</li>
            <li>|</li>
            <li>Arbitrum Sepolia</li>
          </ul>
        </div>
      </div>
      <div className="space-y-5">
        <Card className="w-full">
          <div className="items-end justify-between md:flex">
            <div className="items-start justify-start md:flex md:space-x-5">
              <Image src="/bearLogo.png" width={50} height={50} alt="image" className="mx-auto md:mx-0 md:mt-1" />
              <div className="md:w-fit">
                <h2 className="w-full text-nowrap text-center text-3xl font-bold md:text-left md:text-4xl">
                  Smoothcoin BTC
                </h2>
                <p className="w-full text-nowrap text-center text-xs text-yellow-300 md:text-left md:text-sm">
                  Arbitrum Sepolia <b className="font-light text-white">- Testnet</b>
                </p>
                <p className="mt-5 text-center md:text-left md:text-2xl">
                  Live your life without having to constantly check on the market.
                </p>
              </div>
            </div>
            <button className="mt-5 w-full rounded-lg bg-carmesi px-5 py-2 md:mt-0 md:w-fit" onClick={() => goTo(0)}>
              <p className="text-white">Start Trading</p>
            </button>
          </div>
        </Card>
        <Card className="w-full">
          <div className="items-end justify-between md:flex">
            <div className="items-start justify-start md:flex md:space-x-5">
              <img
                src="https://placehold.co/600x600/gold/black?text=M"
                width={50}
                height={50}
                alt="image"
                className="mx-auto md:mx-0 md:mt-1"
              />
              <div className="md:w-fit">
                <h2 className="w-full text-nowrap text-center text-3xl font-bold md:text-left md:text-4xl">
                  Momentum BTC
                </h2>
                <p className="w-full text-nowrap text-center text-xs text-yellow-300 md:text-left md:text-sm">
                  Arbitrum Sepolia <b className="font-light text-white">- Testnet</b>
                </p>
                <p className="mt-5 w-[70%] text-center md:text-left md:text-2xl">
                  Outperform passive HODLing with a 30-year tested, no leverage TradFi Strategy
                </p>
              </div>
            </div>
            <button className="mt-5 w-full rounded-lg bg-carmesi px-5 py-2 md:mt-0 md:w-fit" onClick={() => goTo(1)}>
              <p className="text-white">Start Trading</p>
            </button>
          </div>
        </Card>
      </div>
      <h4 className="my-10 text-3xl">Coming Soon...</h4>

      <div className="items-center justify-between space-y-5 md:flex md:space-x-5 md:space-y-0">
        <Card className="w-full !bg-[#535E73]">
          <div className="items-start justify-start md:flex md:space-x-5">
            <img
              src="https://placehold.co/600x600/lightblue/black?text=A1"
              width={50}
              height={50}
              alt="image"
              className="mx-auto rounded-full md:mx-0 md:mt-1"
            />
            <div className="md:w-fit">
              <h2 className="w-full text-nowrap text-center text-3xl font-bold md:text-left md:text-4xl">Alpha One</h2>
              <p className="w-full text-nowrap text-center text-xs text-yellow-300 md:text-left md:text-sm">Arbitrum</p>
              <p className="mt-5 text-center md:text-left">Coming Q4 2024 to testnet</p>
            </div>
          </div>
        </Card>
      </div>
      <div className="mt-5 items-center justify-between space-y-5 md:flex md:space-x-5 md:space-y-0">
        <Card className="w-full !bg-[#535E73]">
          <div className="items-start justify-start md:flex md:space-x-5">
            <Image src="/bearLogo.png" width={50} height={50} alt="image" className="mx-auto md:mx-0 md:mt-1" />
            <div className="md:w-fit">
              <h2 className="w-full text-nowrap text-center text-3xl font-bold md:text-left md:text-4xl">
                Smoothcoin ETH
              </h2>
              <p className="w-full text-nowrap text-center text-xs text-yellow-300 md:text-left md:text-sm">Arbitrum</p>
              <p className="mt-5 text-center md:text-left">Coming Q4 2024 to testnet</p>
            </div>
          </div>
        </Card>
        <Card className="w-full !bg-[#535E73]">
          <div className="items-start justify-start md:flex md:space-x-5">
            <Image src="/bearLogo.png" width={50} height={50} alt="image" className="mx-auto md:mx-0 md:mt-1" />
            <div className="md:w-fit">
              <h2 className="w-full text-nowrap text-center text-3xl font-bold md:text-left md:text-4xl">
                Smoothcoin PEPE
              </h2>
              <p className="w-full text-nowrap text-center text-xs text-yellow-300 md:text-left md:text-sm">Arbitrum</p>
              <p className="mt-5 text-center md:text-left">Coming Q4 2024 to testnet</p>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

export default Index
