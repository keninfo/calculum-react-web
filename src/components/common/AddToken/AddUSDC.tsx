import React from 'react'

import { useAccount } from 'wagmi'

import { usdcContract } from '@/contracts/usdc'
import { walletClient } from '@/services/RainbowKitProvider'

interface tokenInfo {
  classname?: string
}

const AddUSDC = ({ classname }: tokenInfo) => {
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
                address: usdcContract.address,
                symbol: 'USDC',
                decimals: 6,
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
      <button onClick={watchAsset} className={`w-full cursor-pointer text-center text-xs text-primary ${classname}`}>
        Add USDc to Wallet
      </button>
    </div>
  )
}

export default AddUSDC
