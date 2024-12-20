'use client'

import type { ClusterBanditType } from '@bandit-network/react'
import { BanditContextProvider, SupportedChains } from '@bandit-network/react'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import type { ReactNode } from 'react'
import React from 'react'

import { BANDIT_KEY } from '@/utils/constants'

import { config } from './RainbowKitProvider'

const password = BANDIT_KEY

console.log(password)

export const BanditProvider = ({ children }: { children: ReactNode }) => {
  const { openConnectModal } = useConnectModal()

  return (
    <BanditContextProvider
      apiKey={process.env.NEXT_PUBLIC_BANDIT_KEY as string}
      cluster={'devnet' as ClusterBanditType}
      walletSettings={{
        enabledChains: [SupportedChains.Evm],
        evm: {
          config: config,
          openConnectModal: openConnectModal as () => void,
        },
      }}
    >
      {children}
    </BanditContextProvider>
  )
}
