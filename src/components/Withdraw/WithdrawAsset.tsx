import React, { useState } from 'react'

import { useAccount } from 'wagmi'

import { AlternateButton, PrimaryButton } from '@/components/common/Buttons'
import Input from '@/components/common/Input'
import ContractReads from '@/hooks/useContractReads'
import useWithdrawAssets from '@/hooks/useWithdrawAssets'
import { formatBalance, formatShares } from '@/utils/formatters'

const WithdrawAsset = () => {
  const [amount, setAmount] = useState<number>(10)
  const { address } = useAccount()
  const { SymbolAsset, SymbolShares, BalanceAssets, ConvertToShares } = ContractReads()
  const { withdrawAssets } = useWithdrawAssets()

  const BalanceAssetResult = BalanceAssets(address).data as bigint

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setAmount(value)
  }

  const setMaxAssets = () => {
    setAmount(parseFloat(formatBalance(BalanceAssetResult)))
  }

  return (
    <>
      <p className="mb-[1vh] mt-[2vh] text-left text-xs">Withdraw {SymbolAsset().data as string}</p>
      <div className="flex justify-between">
        <Input type="number" value={amount} handleChange={handleAmountChange} />
        <AlternateButton handleClick={setMaxAssets} border={true}>
          MAX
        </AlternateButton>
      </div>
      <p className="mb-[1vh] mt-[2vh] text-left text-xs">Equivalent to</p>
      <Input
        type="text"
        value={formatShares(ConvertToShares(amount).data as bigint) + ' Shares of ' + (SymbolShares().data as string)}
        disabled={true}
      />
      <PrimaryButton handleClick={() => withdrawAssets({ amount, address })} className="mt-[4vh]">
        Redeem
      </PrimaryButton>
    </>
  )
}

export default WithdrawAsset
