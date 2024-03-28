import { useMemo } from 'react'
import { Box, Typography } from '@mui/material'
import { useAccount, useReadContract } from 'wagmi'
import { type Hash } from 'viem'

import { calculumVaultContract } from '@/contracts/calculumVault'

import { formatBalance } from '@/utils/formatters'

const OwnBalances = () => {
  const { address: signerAddress } = useAccount()

  const balance = useReadContract({
    abi: calculumVaultContract.abi,
    address: calculumVaultContract.address as Hash,
    functionName: 'DEPOSITS',
    args: [signerAddress],
  })

  const balanceInUSD = useMemo(() => {
    if (!balance || !Array.isArray(balance.data)) return BigInt(0)

    const dataArr = balance.data as any[]

    return dataArr[1] as bigint
  }, [balance])

  const parsedBalanceInUSD = formatBalance(balanceInUSD)

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={4}>
      <Typography mb={2}>Your deposit Balance</Typography>
      <Typography variant="h3">{parsedBalanceInUSD} USDC</Typography>
    </Box>
  )
}

export default OwnBalances
