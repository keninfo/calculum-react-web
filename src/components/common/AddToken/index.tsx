import React from 'react'

import { useAccount } from 'wagmi'

import useContract from '@/hooks/useContract'
import { walletClient } from '@/services/RainbowKitProvider'
import createTransactionAlert from '@/utils/createTransactionAlert'

/** Properties for the `AddToken` component. */
interface TokenInfo {
  /** Optional CSS class to style the button. */
  classname?: string
}

/**
 * A button that allows the user to add an ERC20 token to their wallet.
 *
 * @remarks The component interacts with the Ethereum provider to trigger the `wallet_watchAsset`
 * method, which adds the token to the wallet.
 *
 * @param classname - Optional CSS class to customize the button styling.
 * @returns The `AddToken` button component.
 */
const AddToken: React.FC<TokenInfo> = ({ classname }) => {
  const { chain } = useAccount()
  const { contractAddress, symbol } = useContract()

  const watchAsset = async (): Promise<void> => {
    if (chain?.id !== undefined && walletClient) {
      await walletClient.switchChain({ id: chain.id })
      if (typeof window.ethereum !== 'undefined') {
        try {
          const wasAdded = await walletClient.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address: contractAddress,
                symbol: symbol,
                decimals: 18,
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
      <button
        onClick={watchAsset}
        className={`w-full cursor-pointer text-center text-xs text-primary ${classname} underline`}
      >
        add the {symbol} Symbol to your wallet
      </button>
    </div>
  )
}

export default AddToken
