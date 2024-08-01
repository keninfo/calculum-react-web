import React, { useEffect } from 'react'

import { type BaseError } from 'wagmi'

import ClearButton from '@/components/common/ClearButton'
import useClaimShares from '@/hooks/useClaimShares'
import ContractReads from '@/hooks/useContractReads'
import createTransactionAlert from '@/utils/createTransactionAlert'

interface ClaimProps {
  shares: string
  address: string | undefined
}

const ClaimMint = ({ shares, address }: ClaimProps) => {
  const { ClaimShares, isConfirmed, error } = useClaimShares()
  const { IsClaimerMint } = ContractReads()
  const claimerMint = IsClaimerMint(address).data as boolean

  useEffect(() => {
    if (isConfirmed) {
      createTransactionAlert('Transaction Confirmed', true)
    }
    if (error) {
      createTransactionAlert((error as BaseError).shortMessage || error.message, false)
    }
  }, [isConfirmed, error])

  return (
    <div className="inline p-[1vw] my-[2vh] text-sm">
      <div className="mb-[1vh]">
        <h4>SHARES</h4>
        <p>{shares}</p>
      </div>
      <div className="">
        {claimerMint ? (
          <ClearButton handleClickClearButton={() => ClaimShares(address)}>Claim All Shares</ClearButton>
        ) : (
          <p className="text-center w-full bg-carmesi px-[2vw] rounded-lg py-[1vh] ">{`You don't have any to claim.`}</p>
        )}
      </div>
    </div>
  )
}

export default ClaimMint
