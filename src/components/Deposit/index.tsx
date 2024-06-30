import React from 'react'

import { useAccount } from 'wagmi'

import ContractReads from '@/hooks/useContractReads'
import { formatBalance } from '@/utils/formatters'

import DepositAssets from './DepositAssets'
import Claimet from './Status/Claimet'
import Inactive from './Status/Inactive'
import Pending from './Status/Pending'

type DepositData = [number, bigint, bigint, bigint]

const Deposit = () => {
  const { address } = useAccount()
  const { Deposits, Allowance } = ContractReads()

  const [depositStatus, depositAssets, , depositTotal] = (Deposits(address).data || []) as DepositData
  const finalAmount = depositAssets + depositTotal

  const allowance = Allowance(address).data as number

  return (
    <>
      {depositStatus == 0 && allowance <= 0 && <Inactive />}
      {depositStatus == 0 && allowance > 0 && <DepositAssets />}
      {depositStatus == 1 && <Pending />}
      {depositStatus == 2 && <Claimet />}
      {depositStatus == 3 && <DepositAssets />}
      <div className="mb-[1vh] text-left text-sm">
        <div className="flex justify-between">
          <p>Pending Assets: </p>
          <p>{formatBalance(depositAssets)}</p>
        </div>
        <div className="flex justify-between">
          <p>Total Deposited Assets: </p>
          <p>{formatBalance(finalAmount)}</p>
        </div>
      </div>
    </>
  )
}

export default Deposit
