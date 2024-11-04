import type { Abi, Address, Hash } from 'viem'
import { parseUnits } from 'viem'

import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

interface WithdrawProps {
  amount: number
  address: string | undefined
}
const useWithdrawAssets = () => {
  const { data: hash, isPending, writeContract, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const withdrawAssets = ({ amount, address }: WithdrawProps, contractAddress: Address, contractAbi: Abi) => {
    writeContract({
      abi: contractAbi,
      address: contractAddress as Hash,
      functionName: 'withdraw',
      args: [parseUnits(amount.toString(), 6), address, address],
    })
  }

  return { withdrawAssets, isPending, isConfirming, isConfirmed, hash, error }
}

export default useWithdrawAssets
