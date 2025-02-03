import type { IconName } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHover } from '@uidotdev/usehooks'
import { track } from '@vercel/analytics/react'

import React, { useContext, useEffect, useState } from 'react'

import { type BaseError, useAccount } from 'wagmi'

import AddUSDC from '@/components/common/AddToken/AddUSDC'
import { MaxButton, PrimaryButton } from '@/components/common/Buttons'
import Input from '@/components/common/Input'
import useApprove from '@/hooks/useApprove'
import useContract from '@/hooks/useContract'
import ContractReads from '@/hooks/useContractReads'
import createTransactionAlert from '@/utils/createTransactionAlert'
import { formatBalance } from '@/utils/formatters'

import { AmountContext } from '.'

const Approve = ({ inMaintenance }: { inMaintenance: boolean }) => {
  const { contractAddress, contractAbi } = useContract()
  const [isConfirming, setIsConfirming] = useState<boolean>(false)

  const { SymbolAsset, BalanceAssets } = ContractReads(contractAddress, contractAbi)
  const { ApproveAssets, isPending, error, hash } = useApprove()
  const { amount, setAmount } = useContext(AmountContext)
  const { address } = useAccount()
  const balanceAssets = BalanceAssets(address).data as bigint

  const [ref, hovering] = useHover()

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setAmount(value)
  }

  const setMax = () => {
    if (Number(balanceAssets) / 1000000 > 10000) {
      setAmount(10000)
      return
    }
    setAmount(parseFloat(formatBalance(balanceAssets)))
  }

  const handleApprove = () => {
    setIsConfirming(true)
    ApproveAssets(amount, contractAddress)
  }

  useEffect(() => {
    if (hash) {
      createTransactionAlert('Transaction Approved!', true)
      track('User Approved')
    }
    if (error) {
      createTransactionAlert((error as BaseError).shortMessage || error.message, false)
    }
  }, [hash, error])

  return (
    <>
      <p className="text-center text-offWhite">Great!</p>
      <p className="text-md mb-2 text-center">
        {`You've received`}
        <b className="mx-2 text-offWhite">
          {(Number(balanceAssets) / 1000000).toLocaleString('US')} {SymbolAsset().data as string}
        </b>
      </p>
      <AddUSDC />
      <div className="mx-5 mt-10 flex items-center justify-center border-b-2 border-payne px-2 pb-2">
        <Input
          placeholder="USDC amount..."
          type="number"
          value={amount}
          handleChange={handleAmountChange}
          className="border-none text-lg"
        />
        <MaxButton handleClick={setMax}>MAX</MaxButton>
      </div>

      {!inMaintenance && (
        <PrimaryButton handleClick={() => handleApprove()} disabled={isPending || isConfirming} className="mt-8">
          {isConfirming && !isPending && (
            <p className="mr-2">
              <FontAwesomeIcon icon={['fas', 'spinner' as IconName]} className="animate-spin" />
            </p>
          )}
          {isPending ? 'Approving...' : isConfirming ? 'Confirming...' : 'Approve'}
        </PrimaryButton>
      )}
      <p className="relative mt-4 text-center text-xs">
        <p className="cursor-default text-offWhite" ref={ref}>
          {`Why do I have to "Approve"?`} <FontAwesomeIcon icon={['fas', 'circle-info' as IconName]} />
        </p>
        {hovering && (
          <p className="absolute bottom-6 left-1/2 w-[19.5vw] -translate-x-1/2 rounded-md bg-dark px-4 pb-6 pt-5">
            Token approvals are used to give permission to a smart contract to spend your tokens on your behalf. This is
            a common pattern used by decentralized exchanges, lending protocols, and other decentralized applications.
          </p>
        )}
      </p>
    </>
  )
}

export default Approve
