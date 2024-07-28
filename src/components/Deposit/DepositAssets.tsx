import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useAccount } from 'wagmi'

import AddToken from '@/components/common/AddToken'
import { AlternateButton, PrimaryButton } from '@/components/common/Buttons'
import Input from '@/components/common/Input'
import ContractReads from '@/hooks/useContractReads'
import useDeposit from '@/hooks/useDeposit'
import { formatBalance, formatShares } from '@/utils/formatters'

import Disclaimer from '../Disclaimer'
import Approve from './Approve'

type DepositData = [number, bigint, bigint, bigint]

const DepositAssets = () => {
  const [amount, setAmount] = useState<number>(0)
  const { address } = useAccount()
  const { Deposits, Allowance, MaxDeposit, SymbolAsset, ConvertToShares, BalanceAssets } = ContractReads()
  const [formattedShares, setFormattedShares] = useState<string>('')
  const [formattedBalance, setFormattedBalance] = useState<number>(0)
  const { Deposit, isPending } = useDeposit()

  const router = useRouter()

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

    if (s1 < s2 && s1 < s3) {
      setAmount(parseFloat(formatBalance(s1)))
      return
    }

    if (s2 < s1 && s2 < s3) {
      setAmount(parseFloat(formatBalance(s2)))
      return
    }

    if (s3 < s1 && s3 < s2) {
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

  const handleConfirm = () => {
    router.replace('/dashboard')
  }

  return (
    <>
      <p className="mb-[1vh] mt-[4vh] text-left text-xs">
        You have {formattedBalance}
        <b className="text-carmesi mx-1"> {SymbolAsset().data as string}</b> in Wallet
      </p>
      <div className="flex justify-between">
        <Input type="number" value={amount} handleChange={handleAmountChange} className="rounded-r-none" />
        <AlternateButton handleClick={setMax} border={true} className="rounded-l-none">
          MAX
        </AlternateButton>
      </div>
      <div className="flex justify-between items-end mb-[1vh] mt-[2vh] ">
        <p className="text-left text-xs">You will receive</p>
        <AddToken />
      </div>
      <Input type="text" value={formattedShares + ' Shares'} disabled={true} />
      <div className="inline justify-center px-2">
        {checkAmount >= max ? (
          <p className="bg-carmesi px-[2vw] py-[1vh] rounded-lg">
            {`You've reached the current limit you can deposit on Bear Protocol`}
          </p>
        ) : parseFloat(formatBalance(allowance)) >= amount ? (
          <PrimaryButton handleClick={() => handleDepositClick()} className="mt-[4vh] md:mt-0" disabled={isPending}>
            {isPending ? 'Depositing...' : 'Deposit'}
          </PrimaryButton>
        ) : !Number.isNaN(amount) ? (
          <>
            <Approve amount={amount} onConfirm={() => handleConfirm} />
          </>
        ) : (
          <PrimaryButton
            handleClick={() => {}}
            className="!bg-smoke mt-[4vh] md:mt-0 hover:!scale-100 hover:!text-white"
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
