import React, { useEffect } from 'react'

import Image from 'next/image'

import { useAccount, type BaseError } from 'wagmi'

import useClaimAssets from '@/hooks/useClaimAssets'
import ContractReads from '@/hooks/useContractReads'
import createTransactionAlert from '@/utils/createTransactionAlert'

import { PrimaryButton } from '../common/Buttons'

type responseData = [number, bigint, bigint, bigint]

const ClaimAssets = () => {
  const { address } = useAccount()
  const { ClaimAssets, hash, error } = useClaimAssets()
  const { Withdrawals } = ContractReads()
  const [, , userWithdrawalsAssets] = (Withdrawals(address).data || []) as responseData
  const { IsClaimerWithdraw } = ContractReads()

  const claimerWithdraw = IsClaimerWithdraw(address).data as boolean

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
      <div className="my-5 flex items-center justify-center space-x-5">
        <Image src="/bearLogo.png" width={50} height={50} alt="Picture of the author" />
        <div className="text-left">
          <p>{(Number(userWithdrawalsAssets) / 1000000000000000000).toLocaleString('US')}</p>
          <h4 className="text-[#DCCD5B]">USDC</h4>
        </div>
      </div>

      <div className="">
        {claimerWithdraw ? (
          <PrimaryButton handleClick={() => ClaimAssets(address)}>Claim All Assets</PrimaryButton>
        ) : (
          <p className="w-full rounded-lg bg-[#535E73] px-4 py-2 text-center text-[#888E96]">{`Wait one epoch to be able to claim all assets`}</p>
        )}
      </div>
    </>
  )
}

export default ClaimAssets
