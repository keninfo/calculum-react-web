'use client'

import React from 'react'

import Head from 'next/head'

import MetaTags from '@/components/common/MetaTags'
import { useNavbarStore } from '@/store/useNavbarStore'

import Volatility from './volatility'

const Page = () => {
  const { navbarHeight } = useNavbarStore()

  return (
    <>
      <Head>
        <title key="default-title">Smoothcoin - Learning</title>
        <MetaTags />
      </Head>

      <main
        className={`m-0 hidden h-screen grid-cols-11 space-x-[1vw] p-[0.5vw] text-offWhite md:grid`}
        style={{ marginTop: navbarHeight + 'px' }}
      >
        <div className="col-span-11">
          <Volatility />
        </div>
      </main>
    </>
  )
}

export default Page
