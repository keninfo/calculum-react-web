import type { Hash } from 'viem'
import { base } from 'viem/chains'

import { useAccount, useReadContract } from 'wagmi'

import { velvetPortfolioAbi } from '../abi/velvetPortfolioAbi'

export const useUserVaultState = (portfolioAddress: `0x${string}`) => {
  const { address } = useAccount()

  const { data: tokenList } = useReadContract({
    address: portfolioAddress,
    abi: velvetPortfolioAbi,
    functionName: 'getTokens',
    chainId: base.id,
  })

  const { data: userShares } = useReadContract({
    address: portfolioAddress,
    abi: velvetPortfolioAbi,
    functionName: 'balanceOf',
    args: address ? [address as Hash] : undefined,
    chainId: base.id,
  })

  const { data: totalShares } = useReadContract({
    address: portfolioAddress,
    abi: velvetPortfolioAbi,
    functionName: 'totalSupply',
    chainId: base.id,
  })

  const { data: vaultBalances } = useReadContract({
    address: portfolioAddress,
    abi: velvetPortfolioAbi,
    functionName: 'getTokenBalancesOf',
    args: tokenList ? [tokenList, portfolioAddress] : undefined,
    chainId: base.id,
  })

  const isReady = Boolean(
    tokenList && userShares !== undefined && totalShares !== undefined && vaultBalances !== undefined,
  )

  return {
    tokenList,
    userShares,
    totalShares,
    vaultBalances,
    isReady,
  }
}
