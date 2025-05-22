import type { Abi, Address, Hash } from 'viem'

import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

const useClaimAssets = () => {
  const { data: hash, isPending, writeContract, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const ClaimAssets = (address: string | undefined, contractAddress: Address, contractAbi: Abi) => {
    writeContract({
      abi: contractAbi,
      address: contractAddress as Hash,
      functionName: 'claimAssets',
      args: [address, address],
    })
  }

  return { ClaimAssets, isPending, isConfirming, isConfirmed, hash, error }
}

export default useClaimAssets
