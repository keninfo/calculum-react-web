'use client'

import React from 'react'

import Image from 'next/image'

import { useAccount } from 'wagmi'

import Card from '@/components/common/Card'
import Select from '@/components/common/Select'
import { useNavbarStore } from '@/store/useNavbarStore'

import WorkingContracts from './WorkingContracts'

const Index = () => {
  const { navbarHeight } = useNavbarStore()
  const { isConnected } = useAccount()
  return (
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
          <Card className="mb-4 w-full items-center justify-between !py-1 md:flex">
            <h3 className="text-center text-2xl md:text-left md:text-xl">My Positions</h3>
          </Card>
          <div className="mb-4 grid w-full grid-cols-1 gap-3 md:grid-cols-4">
            <WorkingContracts myPositions />
          </div>
        </>
      )}
      <Card className="mb-4 w-full items-center justify-between bg-eerie !py-1 md:flex">
        <h3 className="text-center text-2xl md:text-left md:text-xl">Our Products</h3>
        <div className="flex items-center justify-center space-x-6 md:justify-end">
          <div className="flex items-center justify-center space-x-2">
            <label>Network:</label>
            <Select
              handleChange={function (e: React.ChangeEvent<HTMLSelectElement>): void {
                throw new Error(`Function not implemented: ${e}`)
              }}
              value={'Network'}
              options={['All']}
            ></Select>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <label>Token:</label>
            <Select
              handleChange={function (e: React.ChangeEvent<HTMLSelectElement>): void {
                throw new Error(`Function not implemented: ${e}`)
              }}
              value={'Token'}
              options={['All']}
            ></Select>
          </div>
        </div>
      </Card>
      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-4">
        <WorkingContracts />
      </div>
    </div>
  )
}

export default Index
