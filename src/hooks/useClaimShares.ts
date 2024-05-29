import type { Hash } from 'viem'

import { useWriteContract } from 'wagmi'

import { calculumVaultContract } from '@/contracts/calculumVault'

const useClaimShares = () => {
  const { writeContract } = useWriteContract()

  const ClaimShares = (address: string | undefined) => {
    writeContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'claimShares',
      args: [address],
    })
  }

  return { ClaimShares }
}

export default useClaimShares
