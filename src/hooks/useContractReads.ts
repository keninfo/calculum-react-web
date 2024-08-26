import type { Hash } from 'viem'
import { parseEther, parseUnits } from 'viem'

import { useReadContract } from 'wagmi'

import { calculumVaultContract } from '@/contracts/calculumVault'
import { usdcContract } from '@/contracts/usdc'

const useContractReads = () => {
  const InMaintenance = () => {
    const { data, isLoading, error } = useReadContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'isMaintenance',
    })
    return { data, isLoading, error }
  }

  const CurrentEpoch = () => {
    const { data, isLoading, error } = useReadContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'CURRENT_EPOCH',
    })
    return { data, isLoading, error }
  }

  const MaxDeposit = () => {
    const { data, isLoading, error } = useReadContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'MAX_DEPOSIT',
    })
    return { data, isLoading, error }
  }

  const TokenPriceAt = (epoch: number | undefined) => {
    const { data, isLoading, error } = useReadContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'VAULT_TOKEN_PRICE',
      args: [epoch],
    })
    return { data, isLoading, error }
  }

  const CheckWhitelist = (address: string | undefined) => {
    const { isLoading, error } = useReadContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'whitelist',
      args: [address],
    })
    return { data: true, isLoading, error }
  }

  const HasDeposited = (address: string | undefined) => {
    const { data, isLoading, error } = useReadContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'isDepositWallet',
      args: [address],
    })
    return { data, isLoading, error }
  }

  const Allowance = (address: string | undefined) => {
    const { data, isLoading, error } = useReadContract({
      abi: usdcContract.abi,
      address: usdcContract.address as Hash,
      functionName: 'allowance',
      args: [address, calculumVaultContract.address],
      query: {
        refetchInterval: 100,
      },
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

  const BalanceShares = (address: string | undefined) => {
    const { data, isLoading, error } = useReadContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'balanceOf',
      args: [address],
    })
    return { data, isLoading, error }
  }

  const BalanceAssets = (address: string | undefined) => {
    const { data, isLoading, error } = useReadContract({
      abi: usdcContract.abi,
      address: usdcContract.address as Hash,
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

  const Deposits = (address: string | undefined) => {
    const { data, isLoading, error } = useReadContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'DEPOSITS',
      args: [address],
    })
    return { data, isLoading, error }
  }

  const IsClaimerMint = (address: string | undefined) => {
    const { data, isLoading, error } = useReadContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'isClaimerMint',
      args: [address],
    })
    return { data, isLoading, error }
  }

  const IsClaimerWithdraw = (address: string | undefined) => {
    const { data, isLoading, error } = useReadContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'isClaimerWithdraw',
      args: [address],
    })
    return { data, isLoading, error }
  }

  const ConvertToShares = (amount: number) => {
    if (typeof amount !== 'number' || isNaN(amount) || amount < 0) {
      amount = 0
    }
    const { data, isLoading, error } = useReadContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'convertToShares',
      args: [parseUnits(amount.toString(), 6)],
    })

    return { data, isLoading, error }
  }

  const ConvertToAssets = (amount: number) => {
    if (typeof amount !== 'number' || isNaN(amount) || amount < 0) {
      amount = 0
    }
    const { data, isLoading, error } = useReadContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'convertToAssets',
      args: [parseEther(amount.toString())],
    })

    return { data, isLoading, error }
  }

  const TotalAssets = () => {
    const { data, isLoading, error } = useReadContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'totalAssets',
    })
    return { data, isLoading, error }
  }

  return {
    InMaintenance,
    CurrentEpoch,
    MaxDeposit,
    TokenPriceAt,
    CheckWhitelist,
    HasDeposited,
    Allowance,
    SymbolAsset,
    SymbolShares,
    BalanceAssets,
    BalanceShares,
    Withdrawals,
    Deposits,
    IsClaimerMint,
    IsClaimerWithdraw,
    ConvertToShares,
    ConvertToAssets,
    TotalAssets,
  }
}

export default useContractReads
