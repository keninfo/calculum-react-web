import React, { useState } from 'react'

import { useAccount } from 'wagmi'

import ClearButton from '@/components/common/ClearButton'
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
      <div className="flex justify-between space-x-5">
        <input
          className="bg-darkness text-white border-2 border-white rounded-lg px-[1vw] py-[1vh] w-full"
          type="number"
          value={amount}
          onChange={handleAmountChange}
        />
        <button className="bg-carmesi rounded-lg px-[2vw] py-[1vh]" onClick={setMaxShares}>
          MAX
        </button>
      </div>
      <p className="mb-[1vh] mt-[2vh] text-left text-xs">Equivalent to</p>
      <input
        className="bg-darkness text-white border-2 border-white rounded-lg px-[1vw] py-[1vh] w-full mb-[4vh]"
        type="string"
        value={formatBalance(ConvertToAssets(amount).data as bigint) + ' BPUSDC'}
        disabled
      />
      <ClearButton
        handleClickClearButton={() => {
          redeemAssets({ amount, address })
        }}
      >
        Redeem
      </ClearButton>
    </>
  )
}

export default Redeem
