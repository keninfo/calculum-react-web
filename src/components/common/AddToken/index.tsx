import React from 'react'

import { useAccount } from 'wagmi'

import { walletClient } from '@/services/RainbowKitProvider'

const AddToken: React.FC = () => {
  const tokenAddress = '0x3e91bfb58A9FD0B9040633F8b286EEF52364D996'
  const tokenSymbol = 'vbUSDC'
  const tokenDecimals = 18
  const { chain } = useAccount()

  const watchAsset = async () => {
    if (chain?.id !== undefined && walletClient) {
      await walletClient.switchChain({ id: chain.id })
      if (typeof window.ethereum !== 'undefined') {
        try {
          const wasAdded = await walletClient.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address: tokenAddress,
                symbol: tokenSymbol,
                decimals: tokenDecimals,
              },
            },
          })

          if (wasAdded) {
            console.log('Thanks for your interest!')
          } else {
            console.log('Your loss!')
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log('Ethereum provider is not available.')
      }
    } else {
      console.log('Chain ID is undefined.')
    }
  }

  return (
    <div>
      <button onClick={watchAsset} className="text-carmesi text-center cursor-pointer w-full text-xs">
        Add Token to Wallet
      </button>
    </div>
  )
}

export default AddToken
