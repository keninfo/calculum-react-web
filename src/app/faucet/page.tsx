import type { Metadata } from 'next'
import Head from 'next/head'

import FaucetComponent from '@/components/FaucetComponent'
import Footer from '@/components/Footer'
import MetaTags from '@/components/common/MetaTags'

export const metadata: Metadata = {
  title: 'Smoothcoin - Faucet',
}

const Faucet = () => {
  return (
    <>
      <Head>
        <MetaTags />
      </Head>

      <main className="mt-10 flex h-screen w-full items-center justify-center">
        <FaucetComponent />
      </main>
      <Footer />
    </>
  )
}

export default Faucet
