'use client'

import React from 'react'

import Head from 'next/head'

import MetaTags from '@/components/common/MetaTags'
import ContractReads from '@/hooks/useContractReads'

import Volatility from './volatility'

const page = () => {
  const { InMaintenance } = ContractReads()

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

export default page
