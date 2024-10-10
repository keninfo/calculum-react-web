import React, { useEffect, useState } from 'react'

import Link from 'next/link'

import { type BaseError, useAccount } from 'wagmi'

import { PrimaryButton } from '@/components/common/Buttons'
import useApprove from '@/hooks/useApprove'
import ContractReads from '@/hooks/useContractReads'
import createTransactionAlert from '@/utils/createTransactionAlert'
import { formatBalance } from '@/utils/formatters'

import Input from '../common/Input'

const Approve = ({ onApprove }: { onApprove: () => void }) => {
  const { ApproveAssets, isPending, error, hash } = useApprove()
  const { SymbolAsset, BalanceAssets } = ContractReads()
  const [amount, setAmount] = useState<number>(0)
  const [formattedBalance, setFormattedBalance] = useState<number>(0)
  const { address } = useAccount()

  const balanceAssets = BalanceAssets(address).data as bigint

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setAmount(value)
  }

  useEffect(() => {
    setFormattedBalance(parseFloat(formatBalance(balanceAssets)))
  }, [balanceAssets])

  useEffect(() => {
    if (hash) {
      onApprove()
    }
    if (error) {
      createTransactionAlert((error as BaseError).shortMessage || error.message, false)
    }
  }, [hash, onApprove, error])

  return (
    <>
      <p className="mb-[1vh] mt-[2vh] text-left text-xs">
        <b className="mx-1 text-carmesi">
          {formattedBalance} {SymbolAsset().data as string}
        </b>
        in Wallet.
      </p>
      <div className="flex justify-between">
        <Input type="number" value={amount} handleChange={handleAmountChange} />
      </div>
      <p className="mt-[1vh] text-center text-xs">
        <Link
          href={'https://revoke.cash/learn/approvals/what-are-token-approvals'}
          target="_blank"
          className="cursor-pointer text-carmesi"
        >
          Why do I have to approve?
        </Link>
      </p>
      <PrimaryButton handleClick={() => ApproveAssets(amount)} disabled={isPending} className="my-[2vh]">
        {isPending ? 'Approving...' : 'Approve'}
      </PrimaryButton>
    </>
  )
}

export default Approve
