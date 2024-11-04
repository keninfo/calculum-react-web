import type { Abi, Address, Hash } from 'viem'
import { parseEther } from 'viem'

import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

interface WithdrawProps {
  amount: number
  address: string | undefined
}
const useRedeemAssets = () => {
  const { data: hash, isPending, writeContract, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const redeemAssets = ({ amount, address }: WithdrawProps, contractAddress: Address, contractAbi: Abi) => {
    writeContract({
      abi: contractAbi,
      address: contractAddress as Hash,
      functionName: 'redeem',
      args: [parseEther(amount.toString()), address, address],
    })
  }

  return { redeemAssets, isPending, isConfirming, isConfirmed, hash, error }
}

export default useRedeemAssets
