import type { Metadata } from 'next'
import Head from 'next/head'

import Footer from '@/components/Footer'
import Home from '@/components/Home'
import MetaTags from '@/components/common/MetaTags'

export const metadata: Metadata = {
  title: 'Bear Protocol - Dashboard',
}

const Dashboard = () => {
  return (
    <>
      <Head>
        <MetaTags />
      </Head>

      <main className="pb-[.5vw]">
        <Home />
      </main>
      <Footer />
    </>
  )
}

export default Dashboard
