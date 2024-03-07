'use client'

// import type { ReactNode } from 'react'
import Head from 'next/head'
// import { type AppProps } from 'next/app'

// import styles from './page.module.css'

// import { useThemeModes } from '@/hooks/useThemeModes.ts'
// import { ThemeProvider } from '@mui/material/styles'

import { Box, Typography } from '@mui/material'
// import { CacheProvider, type EmotionCache } from '@emotion/react'
// import createEmotionCache from '@/utils/createEmotionCache'

import ExampleComponent from '@/components/PageLayout'

// export const AppProviders = ({ children }: { children: ReactNode | ReactNode[] }) => {
//   const theme = useThemeModes()

//   return <ThemeProvider theme={theme}>{children}</ThemeProvider>
// }

// interface BearProtocolAppProps extends AppProps {
//   emotionCache?: EmotionCache
// }

const BearProtocolApp = () => {
  return (
    <>
      <Head>
        <title key="default-title">Bear Protocol</title>
      </Head>

      {/* <CacheProvider value={emotionCache}> */}
      {/* <AppProviders>
          <CssBaseline /> */}

      <Box bgcolor="blue" borderColor="aqua">
        <Typography fontSize="55px">Initial</Typography>
        <ExampleComponent />
      </Box>
      {/* </AppProviders> */}
      {/* </CacheProvider> */}
    </>
  )
}

export default BearProtocolApp
