'use client'

import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { useAccount } from 'wagmi'

import Card from '@/components/common/Card'
import Select from '@/components/common/Select'
import { useNavbarStore } from '@/store/useNavbarStore'

import InitialPopup from '../InitialPopup'
import WorkingContracts from './WorkingContracts'

const Index = () => {
  const { navbarHeight } = useNavbarStore()
  const { isConnected } = useAccount()
  const [modal, setModal] = useState<boolean>(false)
  const [selectedToken, setSelectedToken] = useState<string>('ALL')
  const [selectedChain, setSelectedChain] = useState<string>('ALL')

  useEffect(() => {
    const hasAnswered = localStorage.getItem('userResponse')
    if (!hasAnswered) {
      setModal(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {modal && <InitialPopup setModal={setModal} />}
      <div className="relative h-full min-h-screen overflow-hidden px-10 md:px-0" style={{ marginTop: navbarHeight }}>
        <div className="fixed left-1/2 top-full -z-10 hidden h-screen w-full -translate-x-1/2 -translate-y-1/2 items-end justify-center md:flex">
          <Image
            src={'/moon.png'}
            width={1000}
            height={1000}
            alt="photo of the earth viewed from space / black and white"
            className="h-auto w-full md:h-[100vh] md:w-auto"
            style={{
              animation: 'rotate 1000s linear infinite',
            }}
          />
        </div>
        {isConnected && (
          <>
            <Card className="mb-4 w-full items-center justify-between border border-dark !p-4 !py-1 md:flex">
              <h3 className="text-center text-2xl md:text-left md:text-xl">My Positions</h3>
            </Card>
            <div className="mb-4 grid w-full grid-cols-1 gap-3 md:grid-cols-4">
              <WorkingContracts myPositions />
            </div>
          </>
        )}
        <Card className="mb-4 w-full items-center justify-between border border-dark !p-4 !py-1 md:flex">
          <h3 className="text-center text-2xl md:text-left md:text-xl">Our Products</h3>
        </Card>
        <div className="mb-5 flex items-center justify-center space-x-6 md:justify-end">
          <div className="flex items-center justify-center space-x-2">
            <label className="text-grey">Chain:</label>
            <Select
              handleChange={(e) => setSelectedChain(e.target.value)}
              value={selectedChain}
              options={['All', 'Arbitrum', 'Base', 'Mantle']}
            ></Select>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <label className="text-grey">Token:</label>
            <Select
              handleChange={(e) => setSelectedToken(e.target.value)}
              value={selectedToken}
              options={['All', 'BTC', 'DOGE', 'ETH', 'PEPE']}
            ></Select>
          </div>
        </div>
        <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-4">
          {/* <Card className="h-full w-full border border-dark !p-4 md:col-span-2">
            <h2 className="mb-2 text-xl text-robin">What Is Momentum?</h2>
            <p className='font-thin'>
              Momentum is a crypto native adaptation of a 30+ year-old institutional investing approach used by hedge
              funds and asset managers. Instead of blindly holding through market cycles, Momentum automatically adjusts
              your exposure based on trend.
            </p>
          </Card>
          <Card className="h-full w-full border border-dark !p-4 md:col-span-2">
            <h2 className="mb-2 text-xl text-robin">What Are Smoothcoins?</h2>
            <p className='font-thin'>
              SmoothCoins are tokens designed to stabilize your portfolio by reducing the impact of market volatility.
              They balance risk and reward, offering a middle ground between high volatility assets and stablecoins.
            </p>
          </Card> */}
          <WorkingContracts />
        </div>
      </div>
    </>
  )
}

export default Index
