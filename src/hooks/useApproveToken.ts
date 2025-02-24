import type { Address, Hash } from 'viem'
import { parseUnits } from 'viem'

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import { baseAbi } from '@/contracts/contractIndex'

const useApproveToken = () => {
  const { data: hash, isPending, writeContract, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const ApproveAssets = (amount: number, coinAddress: Address, decimals: number, approveTo: Hash) => {
    writeContract({
      abi: baseAbi,
      address: coinAddress,
      functionName: 'approve',
      args: [approveTo, parseUnits(amount.toString(), decimals)],
    })
  }

  return { ApproveAssets, isPending, isConfirming, isConfirmed, hash, error }
}

export default useApproveToken
