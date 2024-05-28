import React, { useState } from 'react'

import { useAccount } from 'wagmi'

import ContractReads from '@/hooks/useContractReads'
import { formatShares } from '@/utils/formatters'

import Redeem from '../Redeem'
import WithdrawAsset from '../WithdrawAsset'

const Completed = () => {
  const [selected, setSelected] = useState<number>(0)
  const { address } = useAccount()
  const { SymbolShares, BalanceAsset } = ContractReads()

  const BalanceAssetResult = BalanceAsset(address).data as bigint

  return (
    <>
      <p className="text-center text-xs mt-[2vh]">
        You have {parseFloat(formatShares(BalanceAssetResult))}
        <b className="text-carmesi"> {SymbolShares().data as string}</b> in Wallet
      </p>
      <div className="flex justify-between p-[1vw] mb-[2vh] text-sm">
        <div
          className={`text-center border-2  bg-smoke rounded-lg px-[2vw] py-[1vh] cursor-pointer  hover:scale-105 ${selected == 0 ? 'border-white' : 'border-smoke'}`}
          onClick={() => setSelected(0)}
        >
          <h4>Withdraw</h4>
        </div>
        <div
          className={`text-center border-2  bg-smoke rounded-lg px-[2vw] py-[1vh] cursor-pointer  hover:scale-105 ${selected == 1 ? 'border-white' : 'border-smoke'}`}
          onClick={() => setSelected(1)}
        >
          <h4>Redeem</h4>
        </div>
      </div>
      <div className="my-[2vh]">
        {selected == 0 && <WithdrawAsset />}
        {selected == 1 && <Redeem />}
      </div>
    </>
  )
}

export default Completed
