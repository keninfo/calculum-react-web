import { useState } from 'react'

import { parseUnits } from 'viem'
import type { Hash } from 'viem'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import useContract from '@/hooks/useContract'
import { VELVET_CAPITAL_BASE_DEPOSIT_MANAGER } from '@/shared/constants'

interface ApproveToken {
  approve: (amountString: string) => void
  isApproving: boolean
  isApproved: boolean
}

export const useApproveToken = (): ApproveToken => {
  const { address } = useAccount()
  const { writeContract } = useWriteContract()

  const { contractAddress, decimals, contractAbi } = useContract()

  const [txHash, setTxHash] = useState<Hash>()

  const { isLoading: isApproving, isSuccess: isApproved } = useWaitForTransactionReceipt({
    hash: txHash,
    query: { enabled: !!txHash },
  })

  /**
   * Lanza la transacción de approve.
   * @param amountString Cadena decimal (e.g. "1000.5")
   */
  const approve = (amountString: string): void => {
    if (!address) {
      console.error('No user address available')
      return
    }

    if (!contractAddress) {
      console.error('No contract address available')
      return
    }

    if (!decimals) {
      console.error('No decimals available')
      return
    }

    const parseAmount = parseUnits(amountString, decimals)

    writeContract(
      {
        account: address,
        address: contractAddress,
        abi: contractAbi,
        functionName: 'approve',
        args: [VELVET_CAPITAL_BASE_DEPOSIT_MANAGER, parseAmount],
      },
      {
        onSuccess(response) {
          console.log('✅ Approve tx sent', response)
          // Guarda el hash para esperar la confirmación
          setTxHash(response)
        },
        onError(error) {
          console.error('❌ Error sending approve tx', error)
        },
      },
    )
  }

  return { approve, isApproving, isApproved }
}
