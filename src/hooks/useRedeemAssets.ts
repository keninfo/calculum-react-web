import type { Hash } from 'viem'
import { parseEther } from 'viem'

import { useWriteContract } from 'wagmi'

import { calculumVaultContract } from '@/contracts/calculumVault'

interface WithdrawProps {
  amount: number
  address: string | undefined
}
const useRedeemAssets = () => {
  const { writeContract, isPending } = useWriteContract()

  const redeemAssets = ({ amount, address }: WithdrawProps) => {
    writeContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'redeem',
      args: [parseEther(amount.toString()), address, address],
    })
  }

  return { redeemAssets, isPending }
}

export default useRedeemAssets
