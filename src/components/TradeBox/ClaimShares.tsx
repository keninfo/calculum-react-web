import React, { useEffect } from 'react'

import Image from 'next/image'

import { useAccount, type BaseError } from 'wagmi'

import useClaimShares from '@/hooks/useClaimShares'
import ContractReads from '@/hooks/useContractReads'
import createTransactionAlert from '@/utils/createTransactionAlert'
import { formatShares } from '@/utils/formatters'

import AddToken from '../common/AddToken'
import { PrimaryButton } from '../common/Buttons'

type responseData = [number, bigint, bigint, bigint]

const ClaimMint = () => {
  const { address } = useAccount()
  const { ClaimShares, hash, error } = useClaimShares()
  const { IsClaimerMint, Deposits } = ContractReads()
  const [, , userDepositsShares] = (Deposits(address).data || []) as responseData
  const claimerMint = IsClaimerMint(address).data as boolean

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
      <AddToken />
      <div className="my-5 flex items-center justify-center space-x-5">
        <Image src="/bearLogo.png" width={50} height={50} alt="Picture of the author" />
        <div className="text-left">
          <p>{formatShares(userDepositsShares)}</p>
          <h4 className="text-[#DCCD5B]">scUSDc</h4>
        </div>
      </div>

      <div className="">
        {claimerMint ? (
          <PrimaryButton handleClick={() => ClaimShares(address)}>Claim All Smoothcoins</PrimaryButton>
        ) : (
          <p className="w-full rounded-lg bg-[#535E73] px-4 py-2 text-center text-[#888E96]">{`Wait one epoch to be able to claim all shares`}</p>
        )}
      </div>
    </>
  )
}

export default ClaimMint
