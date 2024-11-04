import type { ReactNode } from 'react'
import React from 'react'

import { CoinsProvider } from '@/contexts/CoinsContext'
import { OptionsProvider } from '@/contexts/OptionsContext'
import RainbowKit from '@/services/RainbowKitProvider'

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <OptionsProvider>
      <CoinsProvider>
        <RainbowKit>{children}</RainbowKit>
      </CoinsProvider>
    </OptionsProvider>
  )
}

export default AppProviders
