import React, { useEffect, useState } from 'react'

import Link from 'next/link'

import { type BaseError } from 'wagmi'

import { PrimaryButton } from '@/components/common/Buttons'
import useApprove from '@/hooks/useApprove'
import createTransactionAlert from '@/utils/createTransactionAlert'

import Input from '../common/Input'

const Approve = ({ onApprove }: { onApprove: () => void }) => {
  const { ApproveAssets, isPending, isConfirmed, error } = useApprove()
  const [amount, setAmount] = useState<number>(0)

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setAmount(value)
  }

  useEffect(() => {
    if (isConfirmed) {
      onApprove()
    }
    if (error) {
      createTransactionAlert((error as BaseError).shortMessage || error.message, false)
    }
  }, [isConfirmed, onApprove, error])

  return (
    <>
      <p className="mb-[1vh] text-right text-xs">
        <Link
          href={'https://revoke.cash/learn/approvals/what-are-token-approvals'}
          target="_blank"
          className="text-carmesi cursor-pointer"
        >
          Why do I have to approve?
        </Link>
      </p>
      <div className="flex justify-between">
        <Input type="number" value={amount} handleChange={handleAmountChange} />
      </div>
      <PrimaryButton handleClick={() => ApproveAssets(amount)} disabled={isPending} className="my-[4vh]">
        {isPending ? 'Approving...' : 'Approve'}
      </PrimaryButton>
    </>
  )
}

export default Approve
