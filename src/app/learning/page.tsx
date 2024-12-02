'use client'

import React from 'react'

import Head from 'next/head'

import MetaTags from '@/components/common/MetaTags'

import Volatility from './volatility'

const Page = () => {
  return (
    <>
      <Head>
        <title key="default-title">Smoothcoin - Learning</title>
        <MetaTags />
      </Head>

      <main className={`m-0 mt-10 hidden h-screen grid-cols-11 space-x-[1vw] p-[0.5vw] text-offWhite md:grid`}>
        <div className="col-span-11">
          <Volatility />
        </div>
      </main>
    </>
  )
}

export default Page
