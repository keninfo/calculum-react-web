import React, { useContext, useEffect } from 'react'

import Link from 'next/link'

import { type BaseError, useAccount } from 'wagmi'

import { AlternateButton, PrimaryButton } from '@/components/common/Buttons'
import Input from '@/components/common/Input'
import useApprove from '@/hooks/useApprove'
import useContract from '@/hooks/useContract'
import ContractReads from '@/hooks/useContractReads'
import createTransactionAlert from '@/utils/createTransactionAlert'

import { AmountContext } from '.'

const Approve = () => {
  const { contractAddress, contractAbi } = useContract()

  const { SymbolAsset, BalanceAssets } = ContractReads(contractAddress, contractAbi)
  const { ApproveAssets, isPending, error, hash } = useApprove()
  const { amount, setAmount } = useContext(AmountContext)
  const { address } = useAccount()
  const balanceAssets = BalanceAssets(address).data as bigint

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setAmount(value)
  }

  const setMax = () => {
    setAmount(10000)
  }

  useEffect(() => {
    if (hash) {
      createTransactionAlert('Transaction Approved!', true)
    }
    if (error) {
      createTransactionAlert((error as BaseError).shortMessage || error.message, false)
    }
  }, [hash, error])

  return (
    <>
      <p className="mt-[1vh] text-center text-xs">
        <Link
          href={'https://revoke.cash/learn/approvals/what-are-token-approvals'}
          target="_blank"
          className="cursor-pointer text-primary"
        >
          Why do I have to approve?
        </Link>
      </p>
      <p className="my-5 text-center text-sm text-greySmoke">
        YOU HAVE
        <b className="mx-2 text-white">
          {(Number(balanceAssets) / 1000000).toLocaleString('US')} {SymbolAsset().data as string}
        </b>
      </p>
      <div className="mx-5 flex items-center justify-center border-b-2 border-[#535E73] px-2 pb-2">
        <Input
          placeholder="Amount..."
          type="number"
          value={amount}
          handleChange={handleAmountChange}
          className="border-none text-2xl"
        />
        <AlternateButton handleClick={setMax}>MAX</AlternateButton>
      </div>

      <PrimaryButton handleClick={() => ApproveAssets(amount, contractAddress)} disabled={isPending} className="mt-5">
        {isPending ? 'Approving...' : 'Approve'}
      </PrimaryButton>
    </>
  )
}

export default Approve
