import type { IconName } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHover } from '@uidotdev/usehooks'
import { track } from '@vercel/analytics/react'

import React, { useContext, useEffect } from 'react'

import { type BaseError, useAccount } from 'wagmi'

import { AlternateButton, PrimaryButton } from '@/components/common/Buttons'
import Input from '@/components/common/Input'
import useApprove from '@/hooks/useApprove'
import useContract from '@/hooks/useContract'
import ContractReads from '@/hooks/useContractReads'
import createTransactionAlert from '@/utils/createTransactionAlert'
import { formatBalance } from '@/utils/formatters'

import { AmountContext } from '.'

const Approve = () => {
  const { contractAddress, contractAbi } = useContract()

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
      <p className="relative mt-[1vh] text-center text-sm">
        <p className="cursor-default text-primary" ref={ref}>
          Why do I have to approve? <FontAwesomeIcon icon={['fas', 'circle-info' as IconName]} />
        </p>
        {hovering && (
          <p className="absolute left-1/2 top-6 w-[19.5vw] -translate-x-1/2 rounded-md bg-dark px-4 pb-6 pt-5">
            Token approvals are used to give permission to a smart contract to spend your tokens on your behalf. This is
            a common pattern used by decentralized exchanges, lending protocols, and other decentralized applications.
          </p>
        )}
      </p>
      <p className="my-5 text-center text-sm text-grey">
        YOU HAVE
        <b className="mx-2 text-offWhite">
          {(Number(balanceAssets) / 1000000).toLocaleString('US')} {SymbolAsset().data as string}
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
        <AlternateButton handleClick={setMax}>MAX</AlternateButton>
      </div>

      <PrimaryButton handleClick={() => ApproveAssets(amount, contractAddress)} disabled={isPending} className="mt-5">
        {isPending ? 'Approving...' : 'Approve'}
      </PrimaryButton>
    </>
  )
}

export default Approve
