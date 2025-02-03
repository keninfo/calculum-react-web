import Head from 'next/head'

import Footer from '@/components/Footer'
import Home from '@/components/Home'
import MetaTags from '@/components/common/MetaTags'

const Quests = () => {
  return (
    <>
      <Head>
        <title>HODL Protocol - Products</title>
        <MetaTags />
      </Head>

      <main className="px-5 md:px-0">
        <Home />
      </main>
      <Footer />
    </>
  )
}

export default Quests
