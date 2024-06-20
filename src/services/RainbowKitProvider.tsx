'use client'

import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

import React, { type ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { cookieStorage, createStorage } from 'wagmi'
import { type State, WagmiProvider } from 'wagmi'
import { arbitrum, arbitrumSepolia } from 'wagmi/chains'

import { WALLET_CONNECT_PROJECT_ID } from '@/utils/constants'

export const projectId = WALLET_CONNECT_PROJECT_ID

if (!projectId) throw new Error('Project ID is not defined')

const config = getDefaultConfig({
  appName: 'Bear-Protocol',
  projectId: projectId,
  chains: [arbitrum, arbitrumSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
  storage: createStorage({
    storage: cookieStorage,
  }),
})

const queryClient = new QueryClient()

export default function RainbowKit({ children, initialState }: { children: ReactNode; initialState?: State }) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact"> {children} </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
