import type { Address, Hash } from 'viem'
import { parseUnits } from 'viem'

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import { usdcContract } from '@/contracts/usdc'

const useApprove = () => {
  const { data: hash, isPending, writeContract, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const ApproveAssets = (amount: number, contractAddress: Address) => {
    writeContract({
      abi: usdcContract.abi,
      address: usdcContract.address as Hash,
      functionName: 'approve',
      args: [contractAddress, parseUnits(amount.toString(), 6)],
    })
  }

  return { ApproveAssets, isPending, isConfirming, isConfirmed, hash, error }
}

export default useApprove
