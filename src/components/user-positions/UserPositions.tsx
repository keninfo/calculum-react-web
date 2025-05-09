import { useEffect, useState } from 'react'

import { type Hash } from 'viem'

import { VELVET_CAPITAL_PORTFOLIO } from '@/shared/constants'
import { getUserUsdBalanceFromTvl } from '@/utils/format/velvet-calcs'

import { useUserVaultState } from '../TradeBox/velvet-trade-box/hooks'
import { GetVelvetPortfolioTVL } from './hooks'

const UserPositions = () => {
  const [userPosition, setUserPosition] = useState(0)

  const { userShares, totalShares, vaultBalances } = useUserVaultState(VELVET_CAPITAL_PORTFOLIO as Hash)
  const { data: velvetTVL, isLoading } = GetVelvetPortfolioTVL()

  useEffect(() => {
    if (
      totalShares !== undefined &&
      userShares !== undefined &&
      vaultBalances !== undefined &&
      velvetTVL !== undefined &&
      !isLoading
    ) {
      const userBalance = getUserUsdBalanceFromTvl(
        userShares ?? BigInt(0),
        totalShares ?? BigInt(1),
        BigInt(Number(velvetTVL?.data[0].totalValueLiquidity)),
        18,
        4,
      )

      setUserPosition(userBalance)
    }
  }, [totalShares, userShares, vaultBalances, velvetTVL, isLoading])

  return (
    <div>
      <p className="text-xl text-white">user positions</p>
      <div>user positions</div>
      <p>{userPosition.toString()} usd</p>
      <p>{userShares?.toString()} shares</p>
      {/* {tokenList?.map((token) => (
        <UserPositionRow
          key={token}
          token={token}
          userShares={userShares ?? BigInt(0)}
          totalShares={totalShares ?? BigInt(1)}
          portfolioAddress={VELVET_CAPITAL_PORTFOLIO as Hash}
        />
      ))} */}
    </div>
  )
}

export default UserPositions
