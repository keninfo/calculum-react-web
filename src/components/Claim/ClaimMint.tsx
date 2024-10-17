import React, { useEffect } from 'react'

import { type BaseError } from 'wagmi'

import ClearButton from '@/components/common/ClearButton'
import useClaimShares from '@/hooks/useClaimShares'
import ContractReads from '@/hooks/useContractReads'
import createTransactionAlert from '@/utils/createTransactionAlert'

import AddToken from '../common/AddToken'

interface ClaimProps {
  shares: string
  address: string | undefined
}

const ClaimMint = ({ shares, address }: ClaimProps) => {
  const { ClaimShares, hash, error } = useClaimShares()
  const { IsClaimerMint } = ContractReads()
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
    <div className="my-[2vh] w-full rounded-lg border-2 pt-[1vw] text-sm">
      <AddToken />
      <div className="my-[2vh]">
        <p>{shares}</p>
        <h4>SMOOTHCOINS</h4>
      </div>

      <div className="">
        {claimerMint ? (
          <ClearButton handleClickClearButton={() => ClaimShares(address)}>Claim All Smoothcoins</ClearButton>
        ) : (
          <p className="w-full rounded-lg bg-smoke px-[2vw] py-[1vh] text-center">{`You don't have any to claim.`}</p>
        )}
      </div>
    </div>
  )
}

export default ClaimMint
