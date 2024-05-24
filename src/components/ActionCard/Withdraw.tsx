import React, { useState } from 'react'

import type { Hash } from 'viem'

import { useAccount, useReadContract, useReadContracts, useWriteContract } from 'wagmi'

import { calculumVaultContract } from '@/contracts/calculumVault'
import { usdcContract } from '@/contracts/usdc'
import { formatShares } from '@/utils/formatters'

import ClearButton from '../common/ClearButton'

const Withdraw = () => {
  const [selected, setSelected] = useState<number>(0)
  const [amount, setAmount] = useState<number>(10)
  const { address } = useAccount()
  const { writeContract } = useWriteContract()

  const { data } = useReadContracts({
    contracts: [
      {
        abi: calculumVaultContract.abi,
        address: calculumVaultContract.address as Hash,
        functionName: 'balanceOf',
        args: [address],
      },
      {
        abi: calculumVaultContract.abi,
        address: calculumVaultContract.address as Hash,
        functionName: 'WITHDRAWALS',
        args: [address],
      },
    ],
  })

  const [CoinBalance, withdrawals] = data || []

  const CoinBalanceResult = CoinBalance?.result as bigint

  const [withdrawalStatus, , ,] = (withdrawals?.result || []) as number[]

  const { data: conversionShares } = useReadContract({
    abi: calculumVaultContract.abi,
    address: calculumVaultContract.address as Hash,
    functionName: 'convertToShares',
    args: [amount * 1000000],
  })

  const { data: conversionAssets } = useReadContract({
    abi: calculumVaultContract.abi,
    address: calculumVaultContract.address as Hash,
    functionName: 'convertToShares',
    args: [amount * 1000000],
  })

  const { data: symbolAsset } = useReadContract({
    abi: usdcContract.abi,
    address: usdcContract.address as Hash,
    functionName: 'symbol',
  })

  const { data: symbolShares } = useReadContract({
    abi: calculumVaultContract.abi,
    address: calculumVaultContract.address as Hash,
    functionName: 'symbol',
  })

  function withdrawAssets() {
    writeContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'withdraw',
      args: [amount * 1000000, address, address],
    })
  }

  function RedeemShares() {
    writeContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'redeem',
      args: [amount * 1000000, address, address],
    })
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setAmount(value)
  }

  const setMaxShares = () => {
    setAmount(parseFloat(formatShares(CoinBalanceResult)))
  }

  const setMaxAssets = () => {
    setAmount(parseFloat(formatShares(CoinBalanceResult)))
  }

  return (
    <div className="text-sm">
      {withdrawalStatus == 5 && (
        <p className="text-center mt-[2vh] bg-carmesi px-[2vw] py-[1vh] rounded-lg">
          You have a Withdrawal pending, wait one Epoch for it to be reflected.
        </p>
      )}
      {withdrawalStatus == 4 && (
        <p className="text-center mt-[2vh] bg-carmesi px-[2vw] py-[1vh] rounded-lg">
          You have a Redeem pending, wait one Epoch for it to be reflected.
        </p>
      )}
      {withdrawalStatus != 4 && withdrawalStatus != 5 && (
        <>
          <p className="text-center text-xs mt-[2vh]">
            You have {parseFloat(formatShares(CoinBalanceResult))}
            <b className="text-carmesi"> {symbolShares as string}</b> in Wallet
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
            {selected == 0 && (
              <>
                <p className="mb-[1vh] mt-[2vh] text-left text-xs">Withdraw {symbolAsset as string}</p>
                <div className="flex justify-between space-x-5">
                  <input
                    className="bg-darkness text-white border-2 border-white rounded-lg px-[1vw] py-[1vh] w-full"
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                  <button className="bg-carmesi rounded-lg px-[2vw] py-[1vh]" onClick={setMaxAssets}>
                    MAX
                  </button>
                </div>
                <p className="mb-[1vh] mt-[2vh] text-left text-xs">Equivalent to</p>
                <input
                  className="bg-darkness text-white border-2 border-white rounded-lg px-[1vw] py-[1vh] w-full mb-[4vh]"
                  type="string"
                  value={formatShares(conversionShares as bigint) + ' Shares of ' + (symbolShares as string)}
                  // onChange={handleAmountChange}
                  disabled
                />
                <ClearButton
                  handleClickClearButton={() => {
                    withdrawAssets()
                  }}
                >
                  Withdraw
                </ClearButton>
              </>
            )}
            {selected == 1 && (
              <>
                <p className="mb-[1vh] mt-[2vh] text-left text-xs">Redeem shares of {symbolShares as string}</p>
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
                  value={formatShares(conversionAssets as bigint) + ' BPUSDC'}
                  // onChange={handleAmountChange}
                  disabled
                />
                <ClearButton
                  handleClickClearButton={() => {
                    RedeemShares()
                  }}
                >
                  Redeem
                </ClearButton>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Withdraw
