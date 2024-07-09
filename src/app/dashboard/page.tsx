'use client'

import Head from 'next/head'

import Footer from '@/components/Footer'
import Home from '@/components/Home'
import MetaTags from '@/components/common/MetaTags'

const Dashboard = () => {
  return (
    <>
      <Head>
        <title key="default-title">Bear Protocol</title>
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
