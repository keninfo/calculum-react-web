import React, { useEffect, useState } from 'react'

import { useAccount, type BaseError } from 'wagmi'

import { AlternateButton, PrimaryButton } from '@/components/common/Buttons'
import Input from '@/components/common/Input'
import ContractReads from '@/hooks/useContractReads'
import useRedeemAssets from '@/hooks/useRedeemAssets'
import createTransactionAlert from '@/utils/createTransactionAlert'
import { formatBalance, formatShares } from '@/utils/formatters'

const Redeem = () => {
  const [amount, setAmount] = useState<number>(10)
  const { address } = useAccount()
  const { BalanceShares, ConvertToAssets } = ContractReads()
  const { redeemAssets, isPending, hash, error } = useRedeemAssets()

  const BalanceSharesResult = BalanceShares(address).data as bigint

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setAmount(value)
  }

  const setMaxShares = () => {
    setAmount(parseFloat(formatShares(BalanceSharesResult)))
  }

  useEffect(() => {
    if (hash) {
      createTransactionAlert('Transaction Confirmed', true)
    }
    if (error) {
      createTransactionAlert((error as BaseError).shortMessage || error.message, false)
    }
  }, [hash, error])

  return (
    <>
      <p className="mb-[1vh] mt-[2vh] text-left text-xs">Redeem smoothcoins</p>
      <div className="flex justify-between">
        <Input type="number" value={amount} handleChange={handleAmountChange} className="rounded-r-none" />
        <AlternateButton handleClick={setMaxShares} border={true} className="rounded-l-none">
          MAX
        </AlternateButton>
      </div>
      <p className="mb-[1vh] mt-[2vh] text-left text-xs">Equivalent to</p>
      <Input type="text" value={formatBalance(ConvertToAssets(amount).data as bigint) + ' USDC'} disabled={true} />
      <PrimaryButton handleClick={() => redeemAssets({ amount, address })} className="mt-[2vh]" disabled={isPending}>
        {isPending ? 'Redeeming...' : 'Redeem'}
      </PrimaryButton>
    </>
  )
}

export default Redeem
