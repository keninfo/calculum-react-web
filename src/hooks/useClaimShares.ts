import type { Hash } from 'viem'

import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

import { calculumVaultContract } from '@/contracts/calculumVault'

const useClaimShares = () => {
  const { data: hash, isPending, writeContract, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const ClaimShares = (address: string | undefined) => {
    writeContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'claimShares',
      args: [address],
    })
  }

  return { ClaimShares, isPending, isConfirming, isConfirmed, hash, error }
}

export default useClaimShares
