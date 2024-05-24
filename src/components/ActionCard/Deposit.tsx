import React, { useState } from 'react'

import type { Hash } from 'viem'

import { useAccount, useReadContract, useReadContracts, useWriteContract } from 'wagmi'

import { calculumVaultContract } from '@/contracts/calculumVault'
import { usdcContract } from '@/contracts/usdc'
import { formatBalance, formatShares } from '@/utils/formatters'

import ClearButton from '../common/ClearButton'

const Deposit = () => {
  const [seed, setSeed] = useState(1)
  const { address } = useAccount()
  const [amount, setAmount] = useState<number>(0)
  const { writeContract } = useWriteContract()

  const { data } = useReadContracts({
    contracts: [
      {
        abi: calculumVaultContract.abi,
        address: calculumVaultContract.address as Hash,
        functionName: 'MAX_DEPOSIT',
      },
      {
        abi: usdcContract.abi,
        address: usdcContract.address as Hash,
        functionName: 'allowance',
        args: [address, calculumVaultContract.address],
      },
      {
        abi: usdcContract.abi,
        address: usdcContract.address as Hash,
        functionName: 'balanceOf',
        args: [address],
      },
      {
        abi: calculumVaultContract.abi,
        address: calculumVaultContract.address as Hash,
        functionName: 'DEPOSITS',
        args: [address],
      },
    ],
  })

  const { data: conversion } = useReadContract({
    abi: calculumVaultContract.abi,
    address: calculumVaultContract.address as Hash,
    functionName: 'convertToShares',
    args: [amount * 1000000],
  })

  const [max, allowance, USDCBalance, deposits] = data || []

  const maxResult = max?.result as bigint
  const allowanceResult = allowance?.result as bigint
  const USDCBalanceResult = USDCBalance?.result as bigint

  const [, depositAssets, , finalAmount] = (deposits?.result || []) as bigint[]

  const checkAmount = depositAssets + finalAmount

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setAmount(value)
  }

  const reset = () => {
    setSeed(Math.random())
    console.log(seed)
  }

  const setMax = () => {
    const s1 = maxResult - checkAmount
    const s2 = allowanceResult - checkAmount
    if (allowance?.result == 0) {
      setAmount(parseFloat(formatBalance(s1)))
      return
    }

    if (s1 < s2) {
      setAmount(parseFloat(formatBalance(s1)))
      return
    }
    setAmount(parseFloat(formatBalance(s2)))
  }

  function approve() {
    writeContract({
      abi: usdcContract.abi,
      address: usdcContract.address as Hash,
      functionName: 'approve',
      args: [calculumVaultContract.address, amount * 1000000],
    })
    reset()
  }

  function deposit() {
    writeContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'deposit',
      args: [amount * 1000000, address],
    })
    reset()
  }

  return (
    <div className="text-sm mt-[4vh]" key={seed}>
      <p className="mb-[1vh] mt-[2vh] text-left text-xs">
        You have {parseFloat(formatBalance(USDCBalanceResult))}
        <b className="text-carmesi"> BPUSDC2</b> in Wallet
      </p>
      <div className="flex justify-between space-x-5">
        <input
          className="bg-darkness text-white border-2 border-white rounded-lg px-[1vw] py-[1vh] w-full"
          type="number"
          value={amount}
          onChange={handleAmountChange}
        />
        <button className="bg-carmesi rounded-lg px-[2vw] py-[1vh]" onClick={setMax}>
          MAX
        </button>
      </div>
      <p className="mb-[1vh] mt-[2vh] text-left text-xs">You will receive</p>
      <input
        className="bg-darkness text-white border-2 border-white rounded-lg px-[1vw] py-[1vh] w-full"
        type="string"
        value={formatShares(conversion as bigint) + ' Shares'}
        // onChange={handleAmountChange}
        disabled
      />
      <div className="mb-[1vh] mt-[2vh] text-left text-sm">
        <div className="flex justify-between">
          <p>Pending Assets: </p>
          <p>{formatBalance(depositAssets)}</p>
        </div>
        <div className="flex justify-between">
          <p>Total Deposited Assets: </p>
          <p>{formatBalance(checkAmount)}</p>
        </div>
      </div>
      <div className="inline justify-center px-2">
        {checkAmount >= maxResult ? (
          <p>You have reached the current limit you can have deposited in bear protocol</p>
        ) : parseFloat(formatBalance(allowanceResult)) > 0 ? (
          <ClearButton
            handleClickClearButton={() => {
              deposit()
            }}
          >
            Deposit
          </ClearButton>
        ) : (
          <ClearButton
            handleClickClearButton={() => {
              approve()
            }}
          >
            Approve
          </ClearButton>
        )}
      </div>
    </div>
  )
}

export default Deposit
