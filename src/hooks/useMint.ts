import type { Hash } from 'viem'
import { parseUnits } from 'viem'

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import { tokenContracts } from '@/contracts/tokenContracts'

const useMint = () => {
  const { data: hash, isPending, writeContract, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const MintTokens = (contractAddres: string, address: string, amount: number, decimals: number) => {
    writeContract({
      abi: tokenContracts.abi,
      address: contractAddres as Hash,
      functionName: 'mint',
      args: [address, parseUnits(amount.toString(), decimals)],
    })
  }

  return { MintTokens, isPending, isConfirming, isConfirmed, hash, error }
}

export default useMint
