import type { ReactNode } from 'react'
import React from 'react'

import { CoinsProvider } from '@/contexts/CoinsContext'
import RainbowKit from '@/services/RainbowKitProvider'

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <CoinsProvider>
      <RainbowKit>{children}</RainbowKit>
    </CoinsProvider>
  )
}

export default AppProviders
