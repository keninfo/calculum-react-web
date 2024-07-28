import type { Hash } from 'viem'
import { parseUnits } from 'viem'

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import { calculumVaultContract } from '@/contracts/calculumVault'
import { usdcContract } from '@/contracts/usdc'

const useApprove = () => {
  const { data: hash, isPending, writeContract } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const ApproveAssets = (amount: number) => {
    writeContract({
      abi: usdcContract.abi,
      address: usdcContract.address as Hash,
      functionName: 'approve',
      args: [calculumVaultContract.address, parseUnits(amount.toString(), 6)],
    })
  }

  return { ApproveAssets, isPending, isConfirming, isConfirmed, hash }
}

export default useApprove
