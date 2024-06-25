'use client'

import { useContext } from 'react'

import Head from 'next/head'

import { ProContext } from '@/components/AppProviders'
import IntroQuestionnaire from '@/components/IntroQuestionnaire'
import MetaTags from '@/components/common/MetaTags'

const BearProtocolApp = () => {
  const { pro } = useContext(ProContext)
  return (
    <>
      <Head>
        <title key="default-title">Bear Protocol</title>
        <MetaTags />
      </Head>

      <main>
        <img
          src="/bearPassive.svg"
          alt="Bear Protocol"
          className={`hidden | md:block h-[20vw] absolute -left-20 top-1/2 -translate-y-10  z-50 ${pro ? 'opacity-20' : 'opacity-100'}`}
        />
        <img
          src="/bearAttack.svg"
          alt="Bear Protocol"
          className={`hidden | md:block h-[20vw] absolute right-0 top-1/2  z-50 -scale-x-100 ${pro ? 'opacity-100' : 'opacity-20'}`}
        />
        <IntroQuestionnaire />
      </main>
    </>
  )
}

export default BearProtocolApp
