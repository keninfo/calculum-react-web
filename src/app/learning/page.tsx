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

      <main className={`m-0 h-screen px-5 text-offWhite md:grid md:grid-cols-11 md:space-x-[1vw] md:p-[0.5vw] md:px-0`}>
        <div className="mb-6 flex w-full justify-around border-b border-primary pb-4 text-offWhite md:hidden">
          <Link href={'/'}>Home</Link>
          <Link href={'/dashboard'}>Dashboard</Link>
          <Link href={'https://docs.smoothcoin.io'}>Docs</Link>
          <Link href={'/quests'}>Quests</Link>
        </div>
        <p className="text-center md:hidden">
          Learning page coming soon to mobile, please use a desktop browser to view this section
        </p>
        <div className="col-span-11 mt-10 hidden md:block">
          <Volatility />
        </div>
      </main>
    </>
  )
}

export default Page
