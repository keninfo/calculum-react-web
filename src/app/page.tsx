import type { Metadata } from 'next'
import Head from 'next/head'

import Dashboard from '@/components/Dashboard'
import Footer from '@/components/Footer'
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

      <main className="pb-5">
        <Dashboard />
      </main>
      <Footer />
    </>
  )
}

export default HODLProtocolApp
