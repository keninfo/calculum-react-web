import React, { useEffect, useState } from 'react'

import { type BaseError, useAccount } from 'wagmi'

import { AlternateButton, PrimaryButton } from '@/components/common/Buttons'
import Input from '@/components/common/Input'
import ContractReads from '@/hooks/useContractReads'
import useDeposit from '@/hooks/useDeposit'
import createTransactionAlert from '@/utils/createTransactionAlert'
import { formatBalance, formatShares } from '@/utils/formatters'

import Disclaimer from '../Disclaimer'

type DepositData = [number, bigint, bigint, bigint]

const DepositAssets = ({ onDeposit }: { onDeposit: () => void }) => {
  const [amount, setAmount] = useState<number>(0)
  const { address } = useAccount()
  const { Deposits, Allowance, MaxDeposit, SymbolAsset, ConvertToShares, BalanceAssets } = ContractReads()
  const [formattedShares, setFormattedShares] = useState<string>('')
  const [formattedBalance, setFormattedBalance] = useState<number>(0)
  const { Deposit, isPending, hash, error } = useDeposit()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAgreeChecked, setIsAgreeChecked] = useState(false)

  const [, depositAssets, , depositTotal] = (Deposits(address).data || []) as DepositData
  const checkAmount = depositAssets + depositTotal

  const max = MaxDeposit().data as bigint
  const allowance = Allowance(address).data as bigint
  const convertedShares = ConvertToShares(amount).data as bigint
  const balanceAssets = BalanceAssets(address).data as bigint

  useEffect(() => {
    if (convertedShares) {
      setFormattedShares(formatShares(convertedShares))
    }
    if (balanceAssets) {
      setFormattedBalance(parseFloat(formatBalance(balanceAssets)))
    }
  }, [convertedShares, balanceAssets])

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
    Deposit({ amount, address })
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setIsAgreeChecked(false) // Reset agreement state when closing modal
  }

  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreeChecked(e.target.checked)
  }

  useEffect(() => {
    if (hash) {
      onDeposit()
    }
    if (error) {
      createTransactionAlert((error as BaseError).shortMessage || error.message, false)
    }
  }, [hash, error, onDeposit])

  return (
    <>
      <p className="mb-[1vh] mt-[2vh] text-left text-xs">
        <b className="mx-1 text-carmesi">
          {formattedBalance} {SymbolAsset().data as string}
        </b>
        in Wallet.
      </p>
      <div className="flex justify-between">
        <Input type="number" value={amount} handleChange={handleAmountChange} className="rounded-r-none" />
        <AlternateButton handleClick={setMax} border={true} className="rounded-l-none">
          MAX
        </AlternateButton>
      </div>
      <div className="mb-[1vh] mt-[2vh] flex items-end justify-between">
        <p className="text-left text-xs">You will receive</p>
      </div>
      <Input type="text" value={formattedShares + ' Smoothcoins'} disabled={true} />
      <div className="inline justify-center px-2">
        {checkAmount >= max ? (
          <p className="rounded-lg bg-carmesi px-[2vw] py-[1vh]">
            {`You've reached the current limit you can deposit on the Testnet`}
          </p>
        ) : parseFloat(formatBalance(allowance)) >= amount ? (
          <PrimaryButton handleClick={() => handleDepositClick()} className="mt-[4vh] md:mt-0" disabled={isPending}>
            {isPending ? 'Depositing...' : 'Deposit'}
          </PrimaryButton>
        ) : (
          <PrimaryButton
            handleClick={() => {}}
            className="mt-[4vh] !bg-smoke hover:!scale-100 hover:!text-white md:mt-0"
            disabled={true}
          >
            Enter a valid amount
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
      </div>
    </>
  )
}

export default DepositAssets
