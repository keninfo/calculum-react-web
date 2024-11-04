import type { ReactNode } from 'react'
import React from 'react'

import { CoinsProvider } from '@/contexts/CoinsContext'
import { OptionsProvider } from '@/contexts/OptionsContext'
import { ProProvider } from '@/contexts/ProContext'
import RainbowKit from '@/services/RainbowKitProvider'

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <OptionsProvider>
      <ProProvider>
        <CoinsProvider>
          <RainbowKit>{children}</RainbowKit>
        </CoinsProvider>
      </ProProvider>
    </OptionsProvider>
  )
}

export default AppProviders
