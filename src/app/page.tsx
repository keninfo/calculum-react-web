'use client'

import Head from 'next/head'
import { Box } from '@mui/material'
import Home from '@/components/Home'
import Header from '@/components/common/Header'

const BearProtocolApp = () => {
  return (
    <>
      <Head>
        <title key="default-title">Bear Protocol</title>
      </Head>

      <header>
        <Box>
          <Box>
            <Header />
          </Box>
        </Box>
      </header>

      <Home />
    </>
  )
}

export default BearProtocolApp
