import React, { useContext, useEffect } from 'react'

import { useAccount, type BaseError } from 'wagmi'

import { AlternateButton, PrimaryButton } from '@/components/common/Buttons'
import Input from '@/components/common/Input'
import useContract from '@/hooks/useContract'
import ContractReads from '@/hooks/useContractReads'
import useWithdrawAssets from '@/hooks/useWithdrawAssets'
import createTransactionAlert from '@/utils/createTransactionAlert'
import { formatBalance, formatShares } from '@/utils/formatters'

import { AmountContext } from '.'

const WithdrawAsset = () => {
  const { contractAddress, contractAbi, symbol } = useContract()

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
      <p className="my-5 text-center text-sm text-grey">
        YOU HAVE
        <b className="mx-2 text-offWhite">
          {(Number(BalanceSharesResult) / 1000000000000000000).toLocaleString('US')} {symbol}
        </b>
      </p>
      <div className="mx-5 flex items-center justify-center border-b-2 border-payne px-2 pb-2">
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
        <b className="text-citron">
          {' '}
          {(Number(ConvertToShares(amount).data as bigint) / 1000000000000000000 || 0).toLocaleString('US')}
        </b>
        <p>{symbol}</p>
      </div>
      <div className="mt-5 flex-row text-center text-xs">
        <p className="text-grey">YOU WILL RECEIVE</p>
        <b className="text-grey"> {(Number(amount) || 0).toLocaleString('US')} USDC</b>
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
