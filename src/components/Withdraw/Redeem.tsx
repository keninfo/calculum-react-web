import React, { useState } from 'react'

import { useAccount } from 'wagmi'

import { AlternateButton, PrimaryButton } from '@/components/common/Buttons'
import Input from '@/components/common/Input'
import ContractReads from '@/hooks/useContractReads'
import useRedeemAssets from '@/hooks/useRedeemAssets'
import { formatBalance, formatShares } from '@/utils/formatters'

const Redeem = () => {
  const [amount, setAmount] = useState<number>(10)
  const { address } = useAccount()
  const { SymbolShares, BalanceShares, ConvertToAssets } = ContractReads()
  const { redeemAssets } = useRedeemAssets()

  const BalanceSharesResult = BalanceShares(address).data as bigint

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setAmount(value)
  }

  const setMaxShares = () => {
    setAmount(parseFloat(formatShares(BalanceSharesResult)))
  }

  return (
    <>
      <p className="mb-[1vh] mt-[2vh] text-left text-xs">Redeem shares of {SymbolShares().data as string}</p>
      <div className="flex justify-between">
        <Input type="number" value={amount} handleChange={handleAmountChange} />
        <AlternateButton handleClick={setMaxShares} border={true}>
          MAX
        </AlternateButton>
      </div>
      <p className="mb-[1vh] mt-[2vh] text-left text-xs">Equivalent to</p>
      <Input type="text" value={formatBalance(ConvertToAssets(amount).data as bigint) + ' BPUSDC'} disabled={true} />
      <PrimaryButton handleClick={() => redeemAssets({ amount, address })} className="mt-[4vh]">
        Redeem
      </PrimaryButton>
    </>
  )
}

export default Redeem
