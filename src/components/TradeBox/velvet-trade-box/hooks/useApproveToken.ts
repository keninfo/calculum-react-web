import { useState } from 'react'

import { parseUnits } from 'viem'
import type { Hash } from 'viem'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import useContract from '@/hooks/useContract'
import { VELVET_CAPITAL_BASE_DEPOSIT_MANAGER } from '@/shared/constants'

import { getEip1559Fees } from '@/utils/getEip1559Fees'

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
    query: {
      enabled: !!txHash,
      staleTime: 1000,
      gcTime: 1000,
    },
  })

  /**
   * Approve the token for the Velvet Capital Base Deposit Manager
   * @param amountString - Cadena decimal (e.g. "1000.5")
   * @returns - void
   */
  const approve = async (amountString: string): Promise<void> => {
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

    const { maxFeePerGas, maxPriorityFeePerGas } = await getEip1559Fees()

    writeContract(
      {
        account: address,
        address: contractAddress,
        abi: contractAbi,
        functionName: 'approve',
        args: [VELVET_CAPITAL_BASE_DEPOSIT_MANAGER, parseAmount],
        maxFeePerGas,
        maxPriorityFeePerGas,
      },
      {
        onSuccess(response) {
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
