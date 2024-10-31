import type { Metadata } from 'next'
import Head from 'next/head'

import Dashboard from '@/components/Dashboard'
import Footer from '@/components/Footer'
import MetaTags from '@/components/common/MetaTags'

export const metadata: Metadata = {
  title: 'Bearprotocol - Dashboard',
}

const DashboardPage = () => {
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

export default DashboardPage
