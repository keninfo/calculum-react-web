import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { track } from '@vercel/analytics/react'

import React, { useContext, useEffect, useState } from 'react'

import { type BaseError, useAccount } from 'wagmi'

import Disclaimer from '@/components/Disclaimer'
import { MaxButton, PrimaryButton } from '@/components/common/Buttons'
import Input from '@/components/common/Input'
import useContract from '@/hooks/useContract'
import ContractReads from '@/hooks/useContractReads'
import useDeposit from '@/hooks/useDeposit'
import createTransactionAlert from '@/utils/createTransactionAlert'
import { formatBalance } from '@/utils/formatters'

import { AmountContext } from '.'

type DepositData = [number, bigint, bigint, bigint]

const DepositAssets = ({ inMaintenance }: { inMaintenance: boolean }) => {
  const { contractAddress, contractAbi, symbol } = useContract()
  const [isConfirming, setIsConfirming] = useState<boolean>(false)

  const { amount, setAmount } = useContext(AmountContext)
  const { address } = useAccount()
  const { Deposits, Allowance, MaxDeposit, SymbolAsset, ConvertToShares, BalanceAssets } = ContractReads(
    contractAddress,
    contractAbi,
  )
  const { Deposit, isPending, hash, error } = useDeposit()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAgreeChecked, setIsAgreeChecked] = useState(false)

  const [, depositAssets, , depositTotal] = (Deposits(address).data || []) as DepositData
  const checkAmount = depositAssets + depositTotal

  const max = MaxDeposit().data as bigint
  const allowance = Allowance(address).data as bigint
  const convertedShares = ConvertToShares(amount).data as bigint
  const balanceAssets = BalanceAssets(address).data as bigint

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setAmount(value)
  }

  const setMax = () => {
    const s1 = max - checkAmount
    const s2 = allowance
    const s3 = balanceAssets

    if (Number(allowance) == 0) {
      setAmount(parseFloat(formatBalance(s1)))
      return
    }

    if (s1 < s2 && s1 <= s3) {
      setAmount(parseFloat(formatBalance(s1)))
      return
    }

    if (s2 < s3) {
      setAmount(parseFloat(formatBalance(s2)))
      return
    }

    if (s3 <= s2) {
      setAmount(parseFloat(formatBalance(s3)))
      return
    }
  }

  const handleDepositClick = () => {
    setIsModalOpen(true)
  }

  const handleAccept = () => {
    setIsConfirming(true)
    Deposit({ amount, address }, contractAddress, contractAbi)
    track('User Deposited')
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setIsAgreeChecked(false)
  }

  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreeChecked(e.target.checked)
  }

  useEffect(() => {
    if (hash) {
      createTransactionAlert('Transaction Approved!', true)
    }
    if (error) {
      createTransactionAlert((error as BaseError).shortMessage || error.message, false)
    }
  }, [hash, error])

  return (
    <>
      <div className="mb-5 flex-row text-center text-sm">
        <p className="text-center text-grey">
          You have
          <b className="mx-1 text-offWhite">
            {(Number(balanceAssets) / 1000000).toLocaleString('US')} {SymbolAsset().data as string}
          </b>
        </p>
        <p className="text-grey">and approved to Deposit</p>
        <b className="text-offWhite"> {(Number(allowance) / 1000000).toLocaleString('US')} USDC</b>
      </div>

      <div className="mx-5 flex items-center justify-center border-b-2 border-payne px-2 pb-2">
        <Input
          placeholder="USDC amount..."
          type="number"
          value={amount}
          handleChange={handleAmountChange}
          className="border-none text-lg"
        />
        <MaxButton handleClick={setMax}>MAX</MaxButton>
      </div>
      <div className="text-md mt-5 flex-row text-center">
        <p className="text-offWhite">You will receive</p>
        <b className="text-xl text-primary">
          {' '}
          {(Number(convertedShares) / 1000000000000000000 || 0).toLocaleString('US')} {symbol}
        </b>
      </div>
      {!inMaintenance && (
        <PrimaryButton handleClick={() => handleDepositClick()} className="mt-5" disabled={isPending || isConfirming}>
          {isConfirming && !isPending && (
            <p className="mr-2">
              <FontAwesomeIcon icon={['fas', 'spinner' as IconName]} className="animate-spin" />
            </p>
          )}
          {isPending ? 'Depositing...' : isConfirming ? 'Confirming...' : 'Deposit'}
        </PrimaryButton>
      )}
      {isModalOpen && (
        <Disclaimer
          isAgreeChecked={isAgreeChecked}
          handleCloseModal={handleCloseModal}
          handleAgreeChange={handleAgreeChange}
          handleAccept={handleAccept}
        />
      )}
    </>
  )
}

export default DepositAssets
