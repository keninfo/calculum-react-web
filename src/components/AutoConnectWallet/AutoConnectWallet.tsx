'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'

import { useEffect, useRef } from 'react'

import { useAccount } from 'wagmi'

const AutoConnectWallet = () => {
  const { isConnected } = useAccount()
  const openConnectModalRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!isConnected && openConnectModalRef.current) {
      openConnectModalRef.current()
    }
  }, [isConnected])

  return (
    <ConnectButton.Custom>
      {({ openConnectModal }) => {
        openConnectModalRef.current = openConnectModal
        return null
      }}
    </ConnectButton.Custom>
  )
}

export default AutoConnectWallet
