import React, { useState } from 'react'

import { useAccount } from 'wagmi'

import ContractReads from '@/hooks/useContractReads'
import { formatBalance, formatShares } from '@/utils/formatters'

import Claimet from './Status/Claimet'
import Completed from './Status/Completed'
import Pending from './Status/Pending'
import PendingRedeem from './Status/PendingRedeem'
import PendingWithdraw from './Status/PendingWithdraw'

type DepositData = [number, bigint, bigint, bigint]

const Withdraw = () => {
  const { address } = useAccount()
  const { Withdrawals } = ContractReads()
  const [selected, setSelected] = useState<number>(0)
  const { SymbolShares, BalanceShares } = ContractReads()

  const BalanceSharesResult = BalanceShares(address).data as bigint

  const [withdrawalStatus, withdrawnAssets, , withdrawalTotal] = (Withdrawals(address).data || []) as DepositData
  // const [depositStatus, , ,] = (Deposits(address).data || []) as DepositData

  const finalAmount = withdrawnAssets + withdrawalTotal

  return (
    <div className="text-sm">
      <div className="flex  p-[1vw] my-[2vh] text-sm justify-center space-x-[4vw] | md:justify-between md:space-x-0">
        <div
          className={`text-center border-2  bg-smoke  px-[2vw] py-[1vh] cursor-pointer  rounded-lg hover:scale-105 ${selected == 0 ? 'border-white' : 'border-smoke'}`}
          onClick={() => setSelected(0)}
        >
          <h4>Withdraw</h4>
        </div>
        <div
          className={`text-center border-2  bg-smoke px-[2vw] py-[1vh] cursor-pointer  rounded-lg hover:scale-105 ${selected == 1 ? 'border-white' : 'border-smoke'}`}
          onClick={() => setSelected(1)}
        >
          <h4>Redeem</h4>
        </div>
      </div>
      <p className="text-center text-sm ">
        You have {parseFloat(formatShares(BalanceSharesResult))}
        <b className="text-carmesi"> {SymbolShares().data as string}</b> in Wallet
      </p>
      {/* {depositStatus == 0 && <Inactive />} */}
      {withdrawalStatus == 0 && <Completed selected={selected} />}
      {withdrawalStatus == 1 && <Pending />}
      {withdrawalStatus == 2 && <Claimet />}
      {withdrawalStatus == 3 && <Completed selected={selected} />}
      {withdrawalStatus == 4 && <PendingRedeem />}
      {withdrawalStatus == 5 && <PendingWithdraw />}
      <div className="mb-[1vh] mt-[2vh] text-left text-sm">
        <div className="flex justify-between">
          <p>Pending Assets Withdrawn: </p>
          <p>{formatBalance(withdrawnAssets)}</p>
        </div>
        <div className="flex justify-between">
          <p>Total Assets Withdrawn: </p>
          <p>{formatBalance(finalAmount)}</p>
        </div>
      </div>
    </div>
  )
}

export default Withdraw
