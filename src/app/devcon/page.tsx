import type { Metadata } from 'next'
import Head from 'next/head'

import Devcon from '@/components/Devcon'
import Footer from '@/components/Footer'
import MetaTags from '@/components/common/MetaTags'

export const metadata: Metadata = {
  title: 'Bearprotocol - Devcon!',
}

const page = () => {
  return (
    <>
      <Head>
        <MetaTags />
      </Head>

      <main className="p-10">
        <Devcon />
      </main>
      <Footer />
    </>
  )
}

export default page
