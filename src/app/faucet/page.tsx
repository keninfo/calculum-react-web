import type { Metadata } from 'next'
import Head from 'next/head'

import FaucetComponent from '@/components/FaucetComponent'
import Footer from '@/components/Footer'
import MetaTags from '@/components/common/MetaTags'

export const metadata: Metadata = {
  title: 'Bear Protocol - Faucet',
}

const Faucet = () => {
  return (
    <>
      <Head>
        <MetaTags />
      </Head>

      <main className="w-full h-screen flex justify-center items-center mt-10">
        <FaucetComponent />
      </main>
      <Footer />
    </>
  )
}

export default Faucet
