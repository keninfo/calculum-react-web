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
      <div className="flex min-h-screen flex-col justify-between">
        <main className="mx-auto max-w-[1366px] md:pb-5">
          <Home />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default HODLProtocolApp
