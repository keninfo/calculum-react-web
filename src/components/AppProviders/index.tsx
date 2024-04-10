import { CacheProvider } from '@emotion/react'

import type { ReactNode } from 'react'

import { ThemeProvider } from '@mui/material'

import { useThemeModes } from '@/hooks/useThemeModes'
import Web3ModalProvider from '@/services/Web3ModalProvider'
import createEmotionCache from '@/utils/createEmotionCache'

const AppProviders = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const theme = useThemeModes() //! will be discommented until we define a proper squema structure
  const clientSideEmotionCache = createEmotionCache()

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <Web3ModalProvider>{children}</Web3ModalProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default AppProviders
