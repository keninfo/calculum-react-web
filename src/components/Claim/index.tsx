import React from 'react'

import { useAccount } from 'wagmi'

import ContractReads from '@/hooks/useContractReads'
import { formatBalance, formatShares } from '@/utils/formatters'

import ClaimMint from './ClaimMint'
import ClaimWithdraw from './ClaimWithdraw'
import PendingDeposit from './Status/PendingDeposit'
import PendingWithdraw from './Status/PendingWithdraw'

type responseData = [number, bigint, bigint, bigint]

const Claim = () => {
  const { address } = useAccount()
  const { Withdrawals, Deposits } = ContractReads()

  const [userWithdrawalsStatus, userWithdrawalsAssets] = (Withdrawals(address).data || []) as responseData
  const [userDepositsStatus, , userDepositsShares] = (Deposits(address).data || []) as responseData

  const userWithdrawalsStatusResult = Number(userWithdrawalsStatus)
  const userDepositsStatusResult = Number(userDepositsStatus)

  return (
    <div className="space-y-[2vh] py-[2vh] text-sm">
      {/* {userDepositsStatusResult == 0 && <InactiveDeposit />} */}
      {userDepositsStatusResult == 1 ? (
        <PendingDeposit shares={formatShares(userDepositsShares)} />
      ) : (
        <ClaimMint shares={formatShares(userDepositsShares)} address={address} />
      )}
      {userWithdrawalsStatusResult == 1 || userWithdrawalsStatusResult == 4 || userWithdrawalsStatusResult == 5 ? (
        <PendingWithdraw assets={formatBalance(userWithdrawalsAssets)} />
      ) : (
        <ClaimWithdraw assets={formatBalance(userWithdrawalsAssets)} address={address} />
      )}
    </div>
  )
}

export default Claim
