import type { Hash } from 'viem'

import { useWriteContract } from 'wagmi'

import { calculumVaultContract } from '@/contracts/calculumVault'

const useClaimAssets = () => {
  const { writeContract } = useWriteContract()

  const ClaimAssets = (address: string | undefined) => {
    writeContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'claimAssets',
      args: [address],
    })
  }

  return { ClaimAssets }
}

export default useClaimAssets
