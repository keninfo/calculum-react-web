import React, { useEffect, useState } from 'react'

import { useAccount } from 'wagmi'

import { AlternateButton, PrimaryButton } from '@/components/common/Buttons'
import Input from '@/components/common/Input'
import ContractReads from '@/hooks/useContractReads'
import useDeposit from '@/hooks/useDeposit'
import { formatBalance, formatShares } from '@/utils/formatters'

import Approve from './Approve'

type DepositData = [number, bigint, bigint, bigint]

const DepositAssets = () => {
  const [amount, setAmount] = useState<number>(0)
  const { address } = useAccount()
  const { Deposits, Allowance, MaxDeposit, SymbolAsset, ConvertToShares, BalanceAssets } = ContractReads()
  const [formattedShares, setFormattedShares] = useState<string>('')
  const [formattedBalance, setFormattedBalance] = useState<number>(0)
  const { Deposit, isPending } = useDeposit()

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
    if (Number(allowance) == 0) {
      setAmount(parseFloat(formatBalance(s1)))
      return
    }

    if (s1 < s2) {
      setAmount(parseFloat(formatBalance(s1)))
      return
    }
    setAmount(parseFloat(formatBalance(s2)))
  }
  return (
    <>
      {Number(allowance) != 0 && (
        <>
          <p className="mb-[1vh] mt-[4vh] text-left text-xs">
            You have {formattedBalance}
            <b className="text-carmesi mx-1"> {SymbolAsset().data as string}</b> in Wallet
          </p>
          <div className="flex justify-between">
            <Input type="number" value={amount} handleChange={handleAmountChange} />
            <AlternateButton handleClick={setMax} border={true}>
              MAX
            </AlternateButton>
          </div>
          <p className="mb-[1vh] mt-[2vh] text-left text-xs">You will receive</p>
          <Input type="text" value={formattedShares + ' Shares'} disabled={true} />
        </>
      )}
      <div className="inline justify-center px-2">
        {checkAmount >= max ? (
          <p className="bg-carmesi px-[2vw] py-[1vh] rounded-lg">
            {`You've reached the current limit you can deposit on Bear Protocol`}
          </p>
        ) : parseFloat(formatBalance(allowance)) > 0 ? (
          <PrimaryButton
            handleClick={() => Deposit({ amount, address })}
            className="mt-[4vh] md:mt-0"
            disabled={isPending}
          >
            {isPending ? 'Depositing...' : 'Deposit'}
          </PrimaryButton>
        ) : (
          <Approve />
        )}
      </div>
    </>
  )
}

export default DepositAssets
