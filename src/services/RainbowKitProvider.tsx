'use client'

import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

import React, { useEffect, useState, type ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { createWalletClient, custom } from 'viem'

import { type State, WagmiProvider } from 'wagmi'
import { arbitrumSepolia } from 'wagmi/chains'

import { useProStore } from '@/store/useProStore'
import { classicTheme, proTheme } from '@/styles/colors'
import { WALLET_CONNECT_PROJECT_ID } from '@/utils/constants'

export const projectId = WALLET_CONNECT_PROJECT_ID

interface ThemeColorsType {
  dark: string
  eerie: string
  primary: string
  offWhite: string
  grey: string
}

if (!projectId) throw new Error('Project ID is not defined')

export const config = getDefaultConfig({
  appName: 'Bear-Protocol',
  projectId: projectId,
  chains: [arbitrumSepolia],
  ssr: true,
})

let walletClient: ReturnType<typeof createWalletClient> | undefined

if (typeof window !== 'undefined' && window.ethereum) {
  walletClient = createWalletClient({
    chain: arbitrumSepolia,
    transport: custom(window.ethereum),
  })
}

const queryClient = new QueryClient()

export default function RainbowKit({ children, initialState }: { children: ReactNode; initialState?: State }) {
  const { pro } = useProStore()

  const [themeColors, setThemeColors] = useState<ThemeColorsType | null>(null)

  useEffect(() => {
    if (!pro) {
      setThemeColors({
        dark: classicTheme.dark,
        eerie: classicTheme.eerie,
        primary: classicTheme.primary,
        offWhite: classicTheme.offWhite,
        grey: classicTheme.grey,
      })
    } else {
      setThemeColors({
        dark: proTheme.dark,
        eerie: proTheme.eerie,
        primary: proTheme.primary,
        offWhite: proTheme.offWhite,
        grey: proTheme.grey,
      })
    }
  }, [pro])

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          theme={darkTheme({ accentColor: themeColors?.primary, borderRadius: 'small' })}
          appInfo={{
            appName: 'BearProtocol',
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export { walletClient }
