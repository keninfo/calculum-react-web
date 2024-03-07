import type { ReactNode } from 'react'
import { ThemeProvider } from '@mui/material'
import { CacheProvider } from '@emotion/react'
import { useThemeModes } from '@/hooks/useThemeModes'
import createEmotionCache from '@/utils/createEmotionCache'

const AppProviders = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const theme = useThemeModes()
  const clientSideEmotionCache = createEmotionCache()

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  )
}

export default AppProviders
