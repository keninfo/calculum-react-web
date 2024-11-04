import React, { useContext, useEffect, useState } from 'react'

import type { Abi, Address } from 'viem'

import { useAccount, type BaseError } from 'wagmi'

import { AlternateButton, PrimaryButton } from '@/components/common/Buttons'
import Input from '@/components/common/Input'
import { OptionsContext } from '@/contexts/OptionsContext'
import { contractMomentumBTC } from '@/contracts/momentumBTC'
import { contractSmoothcoinBTC } from '@/contracts/smoothcoinBTC'
import ContractReads from '@/hooks/useContractReads'
import useWithdrawAssets from '@/hooks/useWithdrawAssets'
import createTransactionAlert from '@/utils/createTransactionAlert'
import { formatBalance, formatShares } from '@/utils/formatters'

import { AmountContext } from '.'

const WithdrawAsset = () => {
  const { coin, strategy } = useContext(OptionsContext)
  const [contractAddress, setContractAddress] = useState<Address>(contractSmoothcoinBTC.address as Address)
  const [contractAbi, setContractAbi] = useState<Abi>(contractSmoothcoinBTC.abi as Abi)

  useEffect(() => {
    const coinStrategy = coin + ' ' + strategy
    if (coinStrategy === 'BTC Momentum') {
      setContractAddress(contractMomentumBTC.address as Address)
      setContractAbi(contractMomentumBTC.abi as Abi)
    } else if (coinStrategy === 'BTC Smoothcoin') {
      setContractAddress(contractSmoothcoinBTC.address as Address)
      setContractAbi(contractSmoothcoinBTC.abi as Abi)
    }
  }, [coin, strategy])

  const { amount, setAmount } = useContext(AmountContext)
  const { address } = useAccount()
  const { BalanceShares, ConvertToShares, ConvertToAssets } = ContractReads(contractAddress, contractAbi)
  const { withdrawAssets, isPending, hash, error } = useWithdrawAssets()

  const BalanceSharesResult = BalanceShares(address).data as bigint
  const formattedShares = formatShares(BalanceSharesResult)
  const convertedAssets = ConvertToAssets(parseFloat(formattedShares)).data as bigint
  const maxAssets = parseFloat(formatBalance(convertedAssets))

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setAmount(value)
  }

  const setMaxAssets = () => {
    setAmount(maxAssets)
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
      <p className="my-5 text-center text-sm text-greySmoke">
        YOU HAVE
        <b className="mx-2 text-white">
          {(Number(BalanceSharesResult) / 1000000000000000000).toLocaleString('US')} scUSDc
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
        <p></p>
        <AlternateButton handleClick={setMaxAssets}>MAX</AlternateButton>
      </div>
      <div className="flex w-full items-center justify-around px-2 pt-4 text-center text-xs">
        <b className="text-[#DCCD5B]">
          {' '}
          {(Number(ConvertToShares(amount).data as bigint) / 1000000000000000000 || 0).toLocaleString('US')}
        </b>
        <p>scUSDc</p>
      </div>
      <div className="mt-5 flex-row text-center text-xs">
        <p className="text-greySmoke">YOU WILL RECEIVE</p>
        <b className="text-greySmoke"> {(Number(amount) || 0).toLocaleString('US')} USDC</b>
      </div>

      <PrimaryButton
        handleClick={() => withdrawAssets({ amount, address }, contractAddress, contractAbi)}
        className="mt-5"
        disabled={isPending}
      >
        {isPending ? 'Withdrawing...' : 'Withdraw'}
      </PrimaryButton>
    </>
  )
}

export default WithdrawAsset
