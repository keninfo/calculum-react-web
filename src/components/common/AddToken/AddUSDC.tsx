import React from 'react'

import { useAccount } from 'wagmi'

import { walletClient } from '@/config/wallet-client'
import { usdcContract } from '@/contracts/usdc'
import createTransactionAlert from '@/utils/createTransactionAlert'

/** * Properties for the `AddUSDC` component. */
interface TokenInfo {
  /** * Optional CSS class to style the button. */
  classname?: string
}

/**
 * A button that allows the user to add USDC to their wallet.
 *
 * @remarks The component interacts with the Ethereum provider to trigger the `wallet_watchAsset`
 * method, which adds the USDC token to the wallet. This one will only be used during testnet.
 *
 * @param classname - Optional CSS class to customize the button styling.
 * @returns The `AddUSDC` button component.
 */
const AddUSDC: React.FC<TokenInfo> = ({ classname }) => {
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
            createTransactionAlert('Token Added', true)
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
    <div className="flex flex-col justify-center px-5 text-center text-xs text-grey">
      <p>{`Don't forget to`} </p>
      <button onClick={watchAsset} className={`w-full cursor-pointer text-xs text-primary ${classname} underline`}>
        add the USDC Symbol to your wallet
      </button>
    </div>
  )
}

export default AddUSDC
