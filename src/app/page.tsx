import type { Metadata } from 'next'
import Head from 'next/head'

import Footer from '@/components/Footer'
import Home from '@/components/Home'
import MetaTags from '@/components/common/MetaTags'

export const metadata: Metadata = {
  title: 'HODL Protocol - Systematic wealth-building for HODLers',
}

const HODLProtocolApp = () => {
  return (
    <>
      <Head>
        <MetaTags />
      </Head>

      <main className="md:pb-5">
        <Home />
      </main>
      <Footer />
    </>
  )
}

export default HODLProtocolApp
