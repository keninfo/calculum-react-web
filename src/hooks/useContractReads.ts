import type { Hash } from 'viem'
import { parseEther, parseUnits } from 'viem'

import { useReadContract } from 'wagmi'

import { calculumVaultContract } from '@/contracts/calculumVault'
import { usdcContract } from '@/contracts/usdc'

const useContractReads = () => {
  const CheckWhitelist = (address: string | undefined) => {
    const { data, isLoading, error } = useReadContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'whitelist',
      args: [address],
    })
    return { data, isLoading, error }
  }

  const SymbolAsset = () => {
    const { data, isLoading, error } = useReadContract({
      abi: usdcContract.abi,
      address: usdcContract.address as Hash,
      functionName: 'symbol',
    })
    return { data, isLoading, error }
  }

  const SymbolShares = () => {
    const { data, isLoading, error } = useReadContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'symbol',
    })
    return { data, isLoading, error }
  }

  const BalanceAsset = (address: string | undefined) => {
    const { data, isLoading, error } = useReadContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'balanceOf',
      args: [address],
    })
    return { data, isLoading, error }
  }

  const Withdrawals = (address: string | undefined) => {
    const { data, isLoading, error } = useReadContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'WITHDRAWALS',
      args: [address],
    })
    return { data, isLoading, error }
  }

  const ConvertToShares = (amount: number) => {
    const { data, isLoading, error } = useReadContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'convertToShares',
      args: [parseUnits(amount.toString(), 6)],
    })

    return { data, isLoading, error }
  }

  const ConvertToAssets = (amount: number) => {
    const { data, isLoading, error } = useReadContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'convertToAssets',
      args: [parseEther(amount.toString())],
    })

    return { data, isLoading, error }
  }

  return { CheckWhitelist, SymbolAsset, SymbolShares, BalanceAsset, Withdrawals, ConvertToShares, ConvertToAssets }
}

export default useContractReads
