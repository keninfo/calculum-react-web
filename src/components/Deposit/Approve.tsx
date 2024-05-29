import React, { useState } from 'react'

import { useAccount } from 'wagmi'

import useApprove from '@/hooks/useApprove'
import ContractReads from '@/hooks/useContractReads'
import { formatBalance } from '@/utils/formatters'

import ClearButton from '@/components/common/ClearButton'

type DepositData = [number, bigint, bigint, bigint]

const Approve = () => {
  const [amount, setAmount] = useState<number>(0)
  const { address } = useAccount()
  const { Deposits, Allowance, MaxDeposit, SymbolAsset, BalanceAssets } = ContractReads()
  const { ApproveAssets } = useApprove()

  const [, depositAssets, , depositTotal] = (Deposits(address).data || []) as DepositData
  const checkAmount = depositAssets + depositTotal

  const max = MaxDeposit().data as bigint
  const allowance = Allowance(address).data as bigint
  const BalanceAssetResult = BalanceAssets(address).data as bigint

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
        You have {parseFloat(formatBalance(BalanceAssetResult))}
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
      <div className="my-[2vh]">
        <ClearButton
          handleClickClearButton={() => {
            ApproveAssets(amount)
          }}
        >
          Approve
        </ClearButton>
      </div>
    </>
  )
}

export default Approve
