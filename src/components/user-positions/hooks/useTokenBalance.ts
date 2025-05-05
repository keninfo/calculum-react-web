import { erc20Abi } from 'viem'
import type { Hash } from 'viem'
import { formatUnits } from 'viem'

import { useReadContract } from 'wagmi'

interface TokenBalanceProps {
  vaultTokenAddress: Hash
  userAddress: Hash
}

export const useVelvetTokenBalance = ({ vaultTokenAddress, userAddress }: TokenBalanceProps): string => {
  const { data: decimals } = useReadContract({
    address: vaultTokenAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: 'decimals',
  })

  const { data } = useReadContract({
    address: vaultTokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [userAddress],
    query: {
      enabled: !!decimals,
    },
  })

  // const { data: tokens } = useReadContract({
  //   address: vaultTokenAddress,
  //   abi: erc20Abi,
  //   functionName: 'symbol',
  //   query: {
  //     enabled: !!data,
  //   },
  // })

  return formatUnits(data ?? BigInt(0), decimals!)
}
