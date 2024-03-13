'use client'

import Head from 'next/head'
import { Box } from '@mui/material'
import Home from '@/components/Home'
import Header from '@/components/common/Header'
import MetaTags from '@/components/common/MetaTags'

const BearProtocolApp = () => {
  return (
    <>
      <Head>
        <title key="default-title">Bear Protocol</title>
        <MetaTags />
      </Head>

      <header>
        <Box>
          <Box>
            <Header />
          </Box>
        </Box>
      </header>

      <main>
        <Home />
      </main>
    </>
  )
}

export default BearProtocolApp
