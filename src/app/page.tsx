import Head from 'next/head'

import Footer from '@/components/Footer'
import IntroQuestionnaire from '@/components/IntroQuestionnaire'
import MetaTags from '@/components/common/MetaTags'

const BearProtocolApp = () => {
  return (
    <>
      <Head>
        <title key="default-title">BearProtocol</title>
        <MetaTags />
      </Head>

      <main>
        <IntroQuestionnaire />
        <Footer />
      </main>
    </>
  )
}

export default BearProtocolApp
