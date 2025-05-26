import type { Metadata } from 'next'
import Head from 'next/head'

import Footer from '@/components/Footer'
import Home from '@/components/Home'
import MetaTags from '@/components/common/MetaTags'
import {UserPositions} from '@/components/user-positions'
import { AutoConnectWallet } from '@/components/AutoConnectWallet'

export const metadata: Metadata = {
  title: 'Portfolios',
}

const HODLPortfolios = () => {
  return (
    <>
      <Head>
        <MetaTags />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <main className="mx-auto max-w-[1366px] md:pb-5">
          <AutoConnectWallet />
          <UserPositions/>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default HODLPortfolios
