import React, { useState } from 'react'

import { useAccount } from 'wagmi'

import { AlternateButton, PrimaryButton } from '@/components/common/Buttons'
import Input from '@/components/common/Input'
import useApprove from '@/hooks/useApprove'
import ContractReads from '@/hooks/useContractReads'
import { formatBalance } from '@/utils/formatters'

type DepositData = [number, bigint, bigint, bigint]

const Approve = () => {
  const [amount, setAmount] = useState<number>(0)
  const { address } = useAccount()
  const { Deposits, MaxDeposit, SymbolAsset, BalanceAssets } = ContractReads()
  const { ApproveAssets, isPending } = useApprove()

  const [, depositAssets, , depositTotal] = (Deposits(address).data || []) as DepositData
  const checkAmount = depositAssets + depositTotal

  const max = MaxDeposit().data as bigint
  const BalanceAssetResult = BalanceAssets(address).data as bigint

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setAmount(value)
  }

  const setMax = () => {
    const s1 = max - checkAmount
    setAmount(parseFloat(formatBalance(s1)))
  }

  return (
    <>
      <p className="mb-[1vh] text-left text-xs">
        You have {parseFloat(formatBalance(BalanceAssetResult))}
        <b className="text-carmesi mx-1"> {SymbolAsset().data as string}</b> in Wallet
      </p>
      <div className="flex justify-between">
        <Input type="number" value={amount} handleChange={handleAmountChange} className="rounded-r-none" />
        <AlternateButton handleClick={setMax} border={true} className="rounded-l-none">
          MAX
        </AlternateButton>
      </div>
      <PrimaryButton handleClick={() => ApproveAssets(amount)} className="my-[2vh]" disabled={isPending}>
        {isPending ? 'Approving...' : 'Approve'}
      </PrimaryButton>
    </>
  )
}

export default Approve
