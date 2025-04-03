'use client'

import type { ClusterBanditType } from '@bandit-network/react'
import { BanditContextProvider, SupportedChains } from '@bandit-network/react'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import type { ReactNode } from 'react'
import React from 'react'

import { useAccount } from 'wagmi'

import { config } from './RainbowKitProvider'

export const BanditProvider = ({ children }: { children: ReactNode }) => {
  const { openConnectModal } = useConnectModal()
  const { address } = useAccount()

  return (
    <BanditContextProvider
      apiKey="1228fb10ed7e478ca4c89dd51d8f5772" // TODO: Transfer this apikey to a secure location
      cluster={'mainnet' as ClusterBanditType}
      connectedAddress={address}
      walletSettings={{
        enabledChains: [SupportedChains.Evm],
        evm: {
          config: config,
          openConnectModal: openConnectModal as () => void,
        },
      }}
      appearance="dark"
    >
      {children}
    </BanditContextProvider>
  )
}
