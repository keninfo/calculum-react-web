import React from 'react'

import { useAccount } from 'wagmi'

import ContractReads from '@/hooks/useContractReads'

import Claimet from './Status/Claimet'
import Completed from './Status/Completed'
import Inactive from './Status/Inactive'
import Pending from './Status/Pending'
import PendingRedeem from './Status/PendingRedeem'
import PendingWithdraw from './Status/PendingWithdraw'

const Withdraw = () => {
  const { address } = useAccount()
  const { Withdrawals } = ContractReads()

  const [withdrawalStatus, , ,] = (Withdrawals(address).data || []) as number[]

  return (
    <div className="text-sm">
      {withdrawalStatus == 0 && <Inactive />}
      {withdrawalStatus == 1 && <Pending />}
      {withdrawalStatus == 2 && <Claimet />}
      {withdrawalStatus == 3 && <Completed />}
      {withdrawalStatus == 4 && <PendingRedeem />}
      {withdrawalStatus == 5 && <PendingWithdraw />}
    </div>
  )
}

export default Withdraw
