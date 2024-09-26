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
  tokenAddress = '0xD332414A71585012701Cb8220CcE9a5DC8F78f07',
  tokenSymbol = 'vbUSDc',
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
      <button onClick={watchAsset} className={`text-carmesi text-center cursor-pointer w-full text-xs ${classname}`}>
        Add Token to Wallet
      </button>
    </div>
  )
}

export default AddToken
