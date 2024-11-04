import type { Abi, Address, Hash } from 'viem'
import { parseUnits } from 'viem'

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

interface DepositProps {
  amount: number
  address: string | undefined
}

const useDeposit = () => {
  const { data: hash, writeContract, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const Deposit = ({ amount, address }: DepositProps, contractAddress: Address, contractAbi: Abi) => {
    writeContract({
      abi: contractAbi,
      address: contractAddress as Hash,
      functionName: 'deposit',
      args: [parseUnits(amount.toString(), 6), address],
    })
  }

  return { Deposit, isPending, isConfirming, isConfirmed, hash, error }
}

export default useDeposit
