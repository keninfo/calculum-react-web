import React, { useEffect, useState } from 'react'

import { useAccount } from 'wagmi'

import ContractReads from '@/hooks/useContractReads'
import createTransactionAlert from '@/utils/createTransactionAlert'
import { formatBalance } from '@/utils/formatters'

import Approve from './Approve'
import DepositAssets from './DepositAssets'
import Claimet from './Status/Claimet'
import Pending from './Status/Pending'

type DepositData = [number, bigint, bigint, bigint]

const Deposit = () => {
  const { address } = useAccount()
  const { Deposits, Allowance } = ContractReads()

  const [depositStatus, depositAssets, , depositTotal] = (Deposits(address).data || []) as DepositData
  const finalAmount = depositAssets + depositTotal
  const allowance = Allowance(address).data as bigint

  const [selected, setSelected] = useState<number>(1)

  useEffect(() => {
    if (Number(allowance) === 0) {
      setSelected(0)
    }
    if (Number(allowance) > 0) {
      setSelected(1)
    }
  }, [allowance, finalAmount])

  const handleApproved = () => {
    createTransactionAlert('Transaction Approved!', true)
  }

  const handleDeposit = () => {
    setSelected(0)
    createTransactionAlert('Transaction Approved!', true)
  }

  return (
    <>
      <div className="mb-[1vh] text-left text-sm">
        <p className="mt-[2vh] text-center text-sm">
          Approved to deposit
          <b className="text-carmesi mx-1"> {formatBalance(allowance)} USDC</b>
        </p>
        <div className="flex my-[2vh] text-sm justify-between w-full">
          <div
            className={`text-center border-2 bg-smoke px-[2vw] py-[1vh] cursor-pointer rounded-lg hover:scale-105 ${selected == 0 ? 'border-white' : 'border-smoke'}`}
            onClick={() => setSelected(0)}
          >
            <h4>1. Approve</h4>
          </div>
          {allowance == BigInt(0) ? (
            <div className="text-center bg-smoke px-[2vw] py-[1vh] rounded-lg opacity-50">
              <h4>2. Deposit</h4>
            </div>
          ) : (
            <div
              className={`text-center border-2 bg-smoke px-[2vw] py-[1vh] cursor-pointer rounded-lg hover:scale-105 ${selected == 1 ? 'border-white' : 'border-smoke'}`}
              onClick={() => setSelected(1)}
            >
              <h4>2. Deposit</h4>
            </div>
          )}
        </div>

        {selected == 0 && <Approve onApprove={handleApproved} />}
        {selected == 1 && depositStatus == 0 && <DepositAssets onDeposit={handleDeposit} />}
        {selected == 1 && depositStatus == 1 && <Pending />}
        {selected == 1 && depositStatus == 2 && <Claimet />}
        {selected == 1 && depositStatus == 3 && <DepositAssets onDeposit={handleDeposit} />}

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
