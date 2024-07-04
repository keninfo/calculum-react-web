'use client'

import Head from 'next/head'

import MetaTags from '@/components/common/MetaTags'

const Dashboard = () => {
  return (
    <>
      <Head>
        <title key="default-title">Bear Protocol - Documents</title>
        <MetaTags />
      </Head>

      <main>
        <h2>Documents</h2>
      </main>
    </>
  )
}

export default Dashboard
