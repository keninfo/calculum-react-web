import { useState, useEffect, useMemo } from 'react'
import type { Theme } from '@mui/material'
import initTheme from '@/styles/theme'

const isSystemDarkMode = (): boolean => {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const useDarkMode = (): boolean => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  useEffect(() => {
    setIsDarkMode(isSystemDarkMode())
  }, [])

  return isDarkMode
}

export const useThemeModes = (): Theme => {
  const isDarkMode = useDarkMode()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  return useMemo(() => initTheme(isDarkMode), [isDarkMode])
}
