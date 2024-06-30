import type { Hash } from 'viem'
import { parseUnits } from 'viem'

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import { calculumVaultContract } from '@/contracts/calculumVault'

interface DepositProps {
  amount: number
  address: string | undefined
}

const useDeposit = () => {
  const { data: hash, writeContract, isPending } = useWriteContract()

  const Deposit = ({ amount, address }: DepositProps) => {
    writeContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'deposit',
      args: [parseUnits(amount.toString(), 6), address],
    })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  return { Deposit, isPending, isConfirming, isConfirmed }
}

export default useDeposit
