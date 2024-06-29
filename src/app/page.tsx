'use client'

import Head from 'next/head'

import IntroQuestionnaire from '@/components/IntroQuestionnaire'
import MetaTags from '@/components/common/MetaTags'

const BearProtocolApp = () => {
  return (
    <>
      <Head>
        <title key="default-title">Bear Protocol</title>
        <MetaTags />
      </Head>

      <main>
        <IntroQuestionnaire />
      </main>
    </>
  )
}

export default BearProtocolApp
