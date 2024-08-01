import type { Hash } from 'viem'

import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

import { calculumVaultContract } from '@/contracts/calculumVault'

const useClaimAssets = () => {
  const { data: hash, isPending, writeContract, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const ClaimAssets = (address: string | undefined) => {
    writeContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'claimAssets',
      args: [address, address],
    })
  }

  return { ClaimAssets, isPending, isConfirming, isConfirmed, hash, error }
}

export default useClaimAssets
