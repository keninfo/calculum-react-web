import type { ReactNode } from 'react'

import type { Metadata } from 'next'
import Head from 'next/head'

import MetaTags from '@/components/common/MetaTags'

export const metadata: Metadata = {
  title: 'HODL Protocol - Systematic wealth-building for HODLers',
}

const layout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <>
      <Head>
        <title>HODL Protocol</title>
        <MetaTags />
      </Head>
      <section className="mx-auto max-w-[1336px] px-2 md:px-5">{children}</section>
    </>
  )
}

export default layout
