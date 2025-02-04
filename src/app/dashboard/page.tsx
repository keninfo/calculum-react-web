import Head from 'next/head'

import Dashboard from '@/components/Dashboard'
import Footer from '@/components/Footer'
import MetaTags from '@/components/common/MetaTags'

const Quests = () => {
  return (
    <>
      <Head>
        <title>HODL Protocol</title>
        <MetaTags />
      </Head>

      <main className="pt-0 md:p-5 md:px-0">
        <Dashboard />
      </main>
      <Footer />
    </>
  )
}

export default Quests
