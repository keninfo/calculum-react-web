import React from 'react'

import { useAccount } from 'wagmi'

import { walletClient } from '@/services/RainbowKitProvider'

interface tokenInfo {
  tokenAddress?: string
  tokenSymbol?: string
  tokenDecimals?: number
  classname?: string
}

const AddToken = ({
  tokenAddress = '0x1728C1a9e2a65b7A9530344284959E26D05af8E7',
  tokenSymbol = 'scUSDc',
  tokenDecimals = 18,
  classname,
}: tokenInfo) => {
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
      <button onClick={watchAsset} className={`w-full cursor-pointer text-center text-xs text-carmesi ${classname}`}>
        Add Token to Wallet
      </button>
    </div>
  )
}

export default AddToken
