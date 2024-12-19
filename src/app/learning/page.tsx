'use client'

import React from 'react'

import Head from 'next/head'
import Link from 'next/link'

import MetaTags from '@/components/common/MetaTags'

import Volatility from './volatility'

const Page = () => {
  return (
    <>
      <Head>
        <title key="default-title">Smoothcoin - Learning</title>
        <MetaTags />
      </Head>
      <div className="relative h-screen w-full flex-col justify-center md:hidden">
        <p className="absolute bottom-1/2 left-1/2 w-3/4 -translate-x-1/2 -translate-y-full px-5 text-center">
          Our Learning Center is not yet available on mobile, please visit us on desktop to view it !
        </p>
        <button className="absolute bottom-1/2 left-1/2 w-max -translate-x-1/2 rounded-md bg-primary px-4 py-2 text-dark">
          <Link href={'/dashboard'}>Go Back to Dashboard</Link>
        </button>
      </div>
      <main className={`m-0 mt-10 hidden h-screen grid-cols-11 space-x-[1vw] p-[0.5vw] text-offWhite md:grid`}>
        <div className="col-span-11">
          <Volatility />
        </div>
      </main>
    </>
  )
}

export default Page
