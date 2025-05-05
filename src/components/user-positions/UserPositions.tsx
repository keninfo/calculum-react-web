import type { Hash } from 'viem'

import { VELVET_CAPITAL_PORTFOLIO } from '@/shared/constants'

import { useUserVaultState } from '../TradeBox/velvet-trade-box/hooks'
import { UserPositionRow } from './components/user-position-row'

const UserPositions = () => {
  const { tokenList, userShares, totalShares } = useUserVaultState(VELVET_CAPITAL_PORTFOLIO as Hash)
  console.log('tokenList =>>', tokenList)
  console.log('userShares =>>', userShares)
  console.log('totalShares =>>', totalShares)

  return (
    <div>
      <p className="text-xl text-white">user positions</p>
      <div>user positions</div>
      {tokenList?.map((token) => (
        <UserPositionRow
          key={token}
          token={token}
          userShares={userShares ?? BigInt(0)}
          totalShares={totalShares ?? BigInt(1)}
          portfolioAddress={VELVET_CAPITAL_PORTFOLIO as Hash}
        />
      ))}
    </div>
  )
}

export default UserPositions
