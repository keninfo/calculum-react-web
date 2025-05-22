import type { Metadata } from 'next'
import Head from 'next/head'

import DashboardView from '@/app/dashboard/view/DashboardView'
import Footer from '@/components/Footer'
import MetaTags from '@/components/common/MetaTags'

export const metadata: Metadata = {
  title: 'HODL Protocol - Systematic wealth-building for HODLers',
}

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>HODL Protocol</title>
        <MetaTags />
      </Head>

      <main className="mx-auto max-w-[1366px] pt-0 md:p-5 md:px-0">
        <DashboardView />
      </main>
      <Footer />
    </>
  )
}

export default DashboardPage
