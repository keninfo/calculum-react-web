import type { Hash } from 'viem'
import { parseUnits } from 'viem'

import { useWriteContract } from 'wagmi'

import { calculumVaultContract } from '@/contracts/calculumVault'
import { usdcContract } from '@/contracts/usdc'

const useApprove = () => {
  const { isPending, writeContract } = useWriteContract()

  const ApproveAssets = (amount: number) => {
    writeContract({
      abi: usdcContract.abi,
      address: usdcContract.address as Hash,
      functionName: 'approve',
      args: [calculumVaultContract.address, parseUnits(amount.toString(), 6)],
    })
  }

  return { ApproveAssets, isPending }
}

export default useApprove
