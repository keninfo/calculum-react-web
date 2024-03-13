import type { ReactNode } from 'react'
import { ThemeProvider } from '@mui/material'
import { CacheProvider } from '@emotion/react'
import { useThemeModes } from '@/hooks/useThemeModes'
import createEmotionCache from '@/utils/createEmotionCache'
import Web3ModalProvider from '@/services/Web3ModalProvider'

const AppProviders = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const theme = useThemeModes()
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
