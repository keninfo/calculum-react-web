import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, { useEffect, useState } from 'react'

import { useAccount, type BaseError } from 'wagmi'

import { MaxButton, PrimaryButton } from '@/components/common/Buttons'
import Input from '@/components/common/Input'
import useContract from '@/hooks/useContract'
import ContractReads from '@/hooks/useContractReads'
import useWithdrawAssets from '@/hooks/useWithdrawAssets'
import createTransactionAlert from '@/utils/createTransactionAlert'
import { formatShares } from '@/utils/formatters'

const WithdrawAsset = ({ inMaintenance }: { inMaintenance: boolean }) => {
  const { contractAddress, contractAbi, symbol } = useContract()

  const [amount, setAmount] = useState<number>(0)
  const { address } = useAccount()
  const { BalanceShares, ConvertToAssets } = ContractReads(contractAddress, contractAbi)
  const { withdrawAssets, isPending, hash, error } = useWithdrawAssets()
  const [isConfirming, setIsConfirming] = useState<boolean>(false)

  const BalanceSharesResult = BalanceShares(address).data as bigint
  const formattedShares = formatShares(BalanceSharesResult)

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setAmount(value)
  }

  const handleWithdraw = () => {
    setIsConfirming(true)
    withdrawAssets({ amount, address }, contractAddress, contractAbi)
  }

  const setMaxAssets = () => {
    setAmount(Number(formattedShares))
  }

  useEffect(() => {
    if (hash) {
      createTransactionAlert('Transaction Confirmed', true)
    }
    if (error) {
      setIsConfirming(false)
      createTransactionAlert((error as BaseError).shortMessage || error.message, false)
    }
  }, [hash, error])

  return (
    <>
      <p className="my-5 text-center text-sm text-grey">
        You have
        <b className="mx-1 text-offWhite">
          {(Number(BalanceSharesResult) / 1000000000000000000).toLocaleString('US')} {symbol}
        </b>
      </p>
      <div className="mx-5 flex items-center justify-center border-b-2 border-payne px-2 pb-2">
        <Input
          placeholder={`${symbol} amount...`}
          type="number"
          value={amount}
          handleChange={handleAmountChange}
          className="border-none text-lg"
        />
        <p></p>
        <MaxButton handleClick={setMaxAssets}>MAX</MaxButton>
      </div>
      <div className="text-md mt-5 flex-row text-center">
        <p className="text-offWhite">You will receive</p>
        <b className="text-xl text-primary">
          {' '}
          {(Number(ConvertToAssets(amount).data as bigint) / 1000000 || 0).toLocaleString('US')} USDC
        </b>
      </div>
      {!inMaintenance && (
        <PrimaryButton handleClick={() => handleWithdraw()} className="mt-5" disabled={isPending || isConfirming}>
          {isConfirming && !isPending && (
            <p className="mr-2">
              <FontAwesomeIcon icon={['fas', 'spinner' as IconName]} className="animate-spin" />
            </p>
          )}
          {isPending ? 'Withdrawing...' : isConfirming ? 'Confirming...' : 'Withdraw'}
        </PrimaryButton>
      )}
    </>
  )
}

export default WithdrawAsset
