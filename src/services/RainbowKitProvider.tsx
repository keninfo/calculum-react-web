'use client'

import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

import React, { useContext, useEffect, useState, type ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { createWalletClient, custom } from 'viem'

import { type State, WagmiProvider } from 'wagmi'
import { arbitrumSepolia } from 'wagmi/chains'

import { ProContext } from '@/components/AppProviders'
import { classicTheme, proTheme } from '@/styles/colors'
import { WALLET_CONNECT_PROJECT_ID } from '@/utils/constants'

export const projectId = WALLET_CONNECT_PROJECT_ID

interface ThemeColorsType {
  darkness: string
  smoke: string
  carmesi: string
  white: string
  greySmoke: string
}

if (!projectId) throw new Error('Project ID is not defined')

const config = getDefaultConfig({
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
  const { pro } = useContext(ProContext)

  const [themeColors, setThemeColors] = useState<ThemeColorsType | null>(null)

  useEffect(() => {
    if (!pro) {
      setThemeColors({
        darkness: classicTheme.darkness,
        smoke: classicTheme.smoke,
        carmesi: classicTheme.carmesi,
        white: classicTheme.white,
        greySmoke: classicTheme.greySmoke,
      })
    } else {
      setThemeColors({
        darkness: proTheme.darkness,
        smoke: proTheme.smoke,
        carmesi: proTheme.carmesi,
        white: proTheme.white,
        greySmoke: proTheme.greySmoke,
      })
    }
  }, [pro])

  useEffect(() => {
    const ensureCorrectChain = async () => {
      if (walletClient) {
        try {
          const currentChainId = await walletClient.getChainId()
          const targetChainId = arbitrumSepolia.id

          if (currentChainId !== targetChainId) {
            await walletClient.switchChain({ id: targetChainId })
          }
        } catch (error) {
          console.error('Error switching chain:', error)
        }
      }
    }

    const intervalId = setInterval(ensureCorrectChain, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          theme={darkTheme({ accentColor: themeColors?.carmesi, borderRadius: 'none' })}
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
