import type { Hash } from 'viem'
import { parseUnits } from 'viem'

import { useWriteContract } from 'wagmi'

import { calculumVaultContract } from '@/contracts/calculumVault'

interface DepositProps {
  amount: number
  address: string | undefined
}

const useDeposit = () => {
  const { writeContract } = useWriteContract()

  const Deposit = ({ amount, address }: DepositProps) => {
    writeContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'deposit',
      args: [parseUnits(amount.toString(), 6), address],
    })
  }

  return { Deposit }
}

export default useDeposit
