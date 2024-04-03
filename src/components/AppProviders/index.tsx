import type { ReactNode } from 'react'
import { ThemeProvider } from '@mui/material'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from '@/utils/createEmotionCache'
import Web3ModalProvider from '@/services/Web3ModalProvider'
import initTheme from '@/styles/theme'

const AppProviders = ({ children }: { children: ReactNode | ReactNode[] }) => {
  // const theme = useThemeModes() //! will be discommented until we define a proper squema structure
  const clientSideEmotionCache = createEmotionCache()

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={initTheme(true)}>
        <Web3ModalProvider>{children}</Web3ModalProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default AppProviders
