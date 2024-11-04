'use client'

import React, { useEffect, useState } from 'react'

import Head from 'next/head'

import type { Abi, Address } from 'viem'

import MetaTags from '@/components/common/MetaTags'
import { contractMomentumBTC } from '@/contracts/momentumBTC'
import { contractSmoothcoinBTC } from '@/contracts/smoothcoinBTC'
import ContractReads from '@/hooks/useContractReads'
import { useOptionsStore } from '@/store/useOptionsStore'

import Volatility from './volatility'

const Page = () => {
  const { coin, strategy } = useOptionsStore()
  const [contractAddress, setContractAddress] = useState<Address>(contractSmoothcoinBTC.address as Address)
  const [contractAbi, setContractAbi] = useState<Abi>(contractSmoothcoinBTC.abi as Abi)

  useEffect(() => {
    const coinStrategy = coin + ' ' + strategy
    if (coinStrategy === 'BTC Momentum') {
      setContractAddress(contractMomentumBTC.address as Address)
      setContractAbi(contractMomentumBTC.abi as Abi)
    } else if (coinStrategy === 'BTC Smoothcoin') {
      setContractAddress(contractSmoothcoinBTC.address as Address)
      setContractAbi(contractSmoothcoinBTC.abi as Abi)
    }
  }, [coin, strategy])
  const { InMaintenance } = ContractReads(contractAddress, contractAbi)

  let status = false

  const data = InMaintenance().data as [boolean, number]
  if (data) {
    status = data[0] as boolean
  }

  return (
    <>
      <Head>
        <title key="default-title">Smoothcoin - Learning</title>
        <MetaTags />
      </Head>

      <main
        className={`| m-0 hidden h-screen grid-cols-11 space-x-[1vw] md:grid ${status ? 'mt-[13.5vh]' : 'mt-[8.5vh]'} p-[0.5vw] text-white`}
      >
        <div className="col-span-11">
          <Volatility />
        </div>
      </main>
    </>
  )
}

export default Page
