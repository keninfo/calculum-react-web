import type { Hash } from 'viem'
import { parseEther } from 'viem'

import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

import { calculumVaultContract } from '@/contracts/calculumVault'

interface WithdrawProps {
  amount: number
  address: string | undefined
}
const useRedeemAssets = () => {
  const { data: hash, isPending, writeContract, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const redeemAssets = ({ amount, address }: WithdrawProps) => {
    writeContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'redeem',
      args: [parseEther(amount.toString()), address, address],
    })
  }

  return { redeemAssets, isPending, isConfirming, isConfirmed, hash, error }
}

export default useRedeemAssets
