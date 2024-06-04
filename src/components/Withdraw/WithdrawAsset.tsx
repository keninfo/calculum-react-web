import React, { useState } from 'react'

import { useAccount } from 'wagmi'

import ClearButton from '@/components/common/ClearButton'
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
        <input
          className="bg-darkness text-white border-2  px-[1vw] py-[1vh] w-full"
          type="number"
          value={amount}
          onChange={handleAmountChange}
        />
        <button className="bg-carmesi border-2  px-[2vw] py-[1vh]" onClick={setMaxAssets}>
          MAX
        </button>
      </div>
      <p className="mb-[1vh] mt-[2vh] text-left text-xs">Equivalent to</p>
      <input
        className="bg-darkness text-white border-2 border-white  px-[1vw] py-[1vh] w-full mb-[4vh]"
        type="string"
        value={formatShares(ConvertToShares(amount).data as bigint) + ' Shares of ' + (SymbolShares().data as string)}
        disabled
      />
      <ClearButton
        handleClickClearButton={() => {
          withdrawAssets({ amount, address })
        }}
      >
        Withdraw
      </ClearButton>
    </>
  )
}

export default WithdrawAsset
