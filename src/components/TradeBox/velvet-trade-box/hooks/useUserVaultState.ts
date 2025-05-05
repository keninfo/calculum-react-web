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
    args: [address as Hash],
    chainId: base.id,
    query: {
      enabled: Boolean(address),
    },
  })

  const { data: totalShares } = useReadContract({
    address: portfolioAddress,
    abi: velvetPortfolioAbi,
    functionName: 'totalSupply',
    chainId: base.id,
  })

  return {
    tokenList,
    userShares,
    totalShares,
  }
}
