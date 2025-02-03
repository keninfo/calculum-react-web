import Head from 'next/head'

import Bandit from '@/components/Bandit'
import Footer from '@/components/Footer'
import MetaTags from '@/components/common/MetaTags'
import { PoweredByBandit } from '@/components/common/PoweredByBandit'

const Quests = () => {
  return (
    <>
      <Head>
        <title>HODL Protocol - Leaderboard</title>
        <MetaTags />
      </Head>

      <main className="px-5 md:px-0">
        <Bandit />
      </main>
      <div className="my-10">
        <PoweredByBandit />
      </div>
      <Footer />
    </>
  )
}

export default Quests
