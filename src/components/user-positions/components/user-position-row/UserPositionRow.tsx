import type { FC } from 'react'

import { erc20Abi } from 'viem'
import { base } from 'viem/chains'

import { useBalance, useReadContract } from 'wagmi'

type Props = {
  tokenAddress: `0x${string}`
  userShares: bigint
  totalShares: bigint
  portfolioAddress: `0x${string}`
}

const UserTokenRow: FC<Props> = ({ tokenAddress, userShares, totalShares, portfolioAddress }) => {
  const { data: symbol } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'symbol',
    chainId: base.id,
  })

  const { data: decimals } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'decimals',
    chainId: base.id,
  })

  const { data: vaultBalance } = useBalance({
    address: portfolioAddress,
    token: tokenAddress,
    chainId: base.id,
  })

  const rawAmount =
    userShares && totalShares && vaultBalance?.value ? (userShares * vaultBalance.value) / totalShares : BigInt(0)

  const formatted = decimals ? Number(rawAmount) / 10 ** decimals : 0

  return (
    <div className="text-white">
      {symbol}: {formatted.toFixed(4)}
    </div>
  )
}

export default UserTokenRow
