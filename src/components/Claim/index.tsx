import React from 'react'

import { useAccount } from 'wagmi'

import ContractReads from '@/hooks/useContractReads'
import { formatBalance, formatShares } from '@/utils/formatters'

import ClaimMint from './ClaimMint'
import ClaimWithdraw from './ClaimWithdraw'
import InactiveDeposit from './Status/InactiveDeposit'
import PendingDeposit from './Status/PendingDeposit'
import PendingWithdraw from './Status/PendingWithdraw'

type responseData = [number, bigint, bigint, bigint]

const Claim = () => {
  const { address } = useAccount()
  const { Withdrawals, Deposits, IsClaimerMint, IsClaimerWithdraw } = ContractReads()

  const [userWithdrawalsStatus, userWithdrawalsAssets] = (Withdrawals(address).data || []) as responseData
  const [userDepositsStatus, , userDepositsShares] = (Deposits(address).data || []) as responseData

  const userWithdrawalsStatusResult = Number(userWithdrawalsStatus)
  const userDepositsStatusResult = Number(userDepositsStatus)

  const claimerMint = IsClaimerMint(address).data as boolean
  const claimerWithdraw = IsClaimerWithdraw(address).data as boolean

  return (
    <div className="text-sm">
      {userDepositsStatusResult == 0 && <InactiveDeposit />}
      {userDepositsStatusResult == 1 && <PendingDeposit shares={formatShares(userDepositsShares)} />}
      {(userWithdrawalsStatusResult == 1 || userWithdrawalsStatusResult == 4 || userWithdrawalsStatusResult == 5) && (
        <PendingWithdraw assets={formatBalance(userWithdrawalsAssets)} />
      )}
      {claimerMint && <ClaimMint shares={formatShares(userDepositsShares)} address={address} />}
      {claimerWithdraw && <ClaimWithdraw assets={formatBalance(userWithdrawalsAssets)} address={address} />}
    </div>
  )
}

export default Claim
