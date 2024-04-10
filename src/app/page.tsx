'use client'

import Head from 'next/head'

import Home from '@/components/Home'
import MetaTags from '@/components/common/MetaTags'

const BearProtocolApp = () => {
  return (
    <>
      <Head>
        <title key="default-title">Bear Protocol</title>
        <MetaTags />
      </Head>

      <main>
        <Home />
      </main>
    </>
  )
}

export default BearProtocolApp
