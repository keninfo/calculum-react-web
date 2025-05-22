import type { FC } from 'react'

import { erc20Abi } from 'viem'
import { base } from 'viem/chains'

import { useReadContract } from 'wagmi'

interface Props {
  token: `0x${string}`
  portfolioAddress: `0x${string}`
  userShares: bigint
  totalShares: bigint
}

const UserTokenRow: FC<Props> = ({ token, portfolioAddress, userShares, totalShares }) => {
  const { data: vaultBalance } = useReadContract({
    address: token,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [portfolioAddress],
    chainId: base.id,
  })

  const { data: symbol } = useReadContract({
    address: token,
    abi: erc20Abi,
    functionName: 'symbol',
    chainId: base.id,
  })

  const { data: decimals } = useReadContract({
    address: token,
    abi: erc20Abi,
    functionName: 'decimals',
    chainId: base.id,
  })

  console.log('userShares', userShares)
  console.log('totalShares', totalShares)
  console.log('vaultBalance', vaultBalance)

  const rawAmount = vaultBalance && userShares && totalShares ? (userShares * vaultBalance) / totalShares : BigInt(0)

  const formatted = decimals !== undefined ? Number(rawAmount) / 10 ** decimals : 0

  return (
    <div className="text-white">
      {symbol ?? '...'}: {formatted.toFixed(decimals ?? 0)} {symbol}
    </div>
  )
}

export default UserTokenRow
