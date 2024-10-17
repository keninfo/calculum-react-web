import type { Metadata } from 'next'
import Head from 'next/head'

import Footer from '@/components/Footer'
import IntroQuestionnaire from '@/components/IntroQuestionnaire'
import MetaTags from '@/components/common/MetaTags'

export const metadata: Metadata = {
  title: 'Smoothcoin - Welcome!',
}

const BearProtocolApp = () => {
  return (
    <>
      <Head>
        <MetaTags />
      </Head>

      <main>
        <IntroQuestionnaire />
        <Footer />
      </main>
    </>
  )
}

export default BearProtocolApp
