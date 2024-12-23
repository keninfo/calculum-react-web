import type { Metadata } from 'next'
import Head from 'next/head'

import Footer from '@/components/Footer'
import Home from '@/components/Home'
import MetaTags from '@/components/common/MetaTags'

export const metadata: Metadata = {
  title: 'HODL Protocol - Welcome!',
}

const HODLProtocolApp = () => {
  return (
    <>
      <Head>
        <MetaTags />
      </Head>

      <main className="p-10">
        <Home />
      </main>
      <Footer />
    </>
  )
}

export default HODLProtocolApp
