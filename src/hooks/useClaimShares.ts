import type { Abi, Address, Hash } from 'viem'

import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

const useClaimShares = () => {
  const { data: hash, isPending, writeContract, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const ClaimShares = (address: string | undefined, contractAddress: Address, contractAbi: Abi) => {
    writeContract({
      abi: contractAbi,
      address: contractAddress as Hash,
      functionName: 'claimShares',
      args: [address],
    })
  }

  return { ClaimShares, isPending, isConfirming, isConfirmed, hash, error }
}

export default useClaimShares
