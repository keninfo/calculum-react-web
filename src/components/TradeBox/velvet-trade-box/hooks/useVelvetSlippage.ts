import { base } from 'viem/chains'

import { useReadContract } from 'wagmi'

import { velvetPortfolioAbi } from '../abi/velvetPortfolioAbi'

export const useVelvetSlippage = (portfolioAddress: `0x${string}`) => {
  const { data: tokenList } = useReadContract({
    address: portfolioAddress,
    abi: velvetPortfolioAbi,
    functionName: 'getTokens',
    chainId: base.id,
  })

  const slippage = (() => {
    if (!tokenList) return '100'
    const tokenCount = tokenList.length
    if (tokenCount <= 1) return '0'
    if (tokenCount <= 3) return '50'
    if (tokenCount <= 5) return '100'
    return '200'
  })()

  return slippage
}
