import React, { useEffect, useState } from 'react'

import { useAccount } from 'wagmi'

import ClearButton from '@/components/common/ClearButton'
import ContractReads from '@/hooks/useContractReads'
import Deposit from '@/hooks/useDeposit'
import { formatBalance, formatShares } from '@/utils/formatters'

import Approve from '../Approve'

type DepositData = [number, bigint, bigint, bigint]

const Completed = () => {
  const [amount, setAmount] = useState<number>(0)
  const { address } = useAccount()
  const { Deposits, Allowance, MaxDeposit, SymbolAsset, SymbolShares, ConvertToShares, BalanceShares } = ContractReads()
  const [formatedShares, setFormatedShares] = useState<string>('')
  const [formatedBalance, setFormatedBalance] = useState<number>(0)
  const [, depositAssets, , depositTotal] = (Deposits(address).data || []) as DepositData
  const checkAmount = depositAssets + depositTotal

  const max = MaxDeposit().data as bigint
  const allowance = Allowance(address).data as bigint

  useEffect(() => {
    setFormatedShares(formatShares(ConvertToShares(amount).data as bigint))
    setFormatedBalance(parseFloat(formatBalance(BalanceShares(address).data as bigint)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount])

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setAmount(value)
  }

  const setMax = () => {
    const s1 = max - checkAmount
    const s2 = allowance - checkAmount
    if (Number(allowance) == 0) {
      setAmount(parseFloat(formatBalance(s1)))
      return
    }

    if (s1 < s2) {
      setAmount(parseFloat(formatBalance(s1)))
      return
    }
    setAmount(parseFloat(formatBalance(s2)))
  }
  return (
    <>
      <p className="mb-[1vh] mt-[4vh] text-left text-xs">
        You have {formatedBalance}
        <b className="text-carmesi mx-1"> {SymbolAsset().data as string}</b> in Wallet
      </p>
      <div className="flex justify-between space-x-5">
        <input
          className="bg-darkness text-white border-2 border-white rounded-lg px-[1vw] py-[1vh] w-full"
          type="number"
          value={amount}
          onChange={handleAmountChange}
        />
        <button className="bg-carmesi rounded-lg px-[2vw] py-[1vh]" onClick={setMax}>
          MAX
        </button>
      </div>
      {Number(allowance) != 0 && (
        <>
          <p className="mb-[1vh] mt-[2vh] text-left text-xs">You will receive</p>
          <input
            className="bg-darkness text-white border-2 border-white rounded-lg px-[1vw] py-[1vh] w-full"
            type="string"
            value={formatedShares + ' Shares of ' + (SymbolShares().data as string)}
            disabled
          />
        </>
      )}

      <div className="inline justify-center px-2">
        {checkAmount >= max ? (
          <p className="bg-carmesi px-[2vw] py-[1vh] rounded-lg">
            {`You've reached the current limit you can deposit on Bear Protocol`}
          </p>
        ) : parseFloat(formatBalance(allowance)) > 0 ? (
          <ClearButton
            handleClickClearButton={() => {
              Deposit()
            }}
          >
            Deposit
          </ClearButton>
        ) : (
          <Approve />
        )}
      </div>
    </>
  )
}

export default Completed
