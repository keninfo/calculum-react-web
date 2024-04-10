import { useState, useEffect, useMemo } from 'react'

import type { Theme } from '@mui/material'

import initTheme from '@/styles/theme'

const useDarkMode = (): boolean => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true)

  useEffect(() => {
    setIsDarkMode(true)
  }, [])

  return isDarkMode
}

export const useThemeModes = (): Theme => {
  const isDarkMode = useDarkMode()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [isDarkMode])

  return useMemo(() => initTheme(isDarkMode), [isDarkMode])
}
